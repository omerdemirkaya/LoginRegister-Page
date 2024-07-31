import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [info, setInfo] = useState("");
  const [infoVisible, setInfoVisible] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const userInfo = JSON.parse(userData);
      setUser(userInfo);
      setFormData({
        username: userInfo.username,
        email: userInfo.email,
        password: userInfo.password,
      });
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (infoVisible) {
      const timer = setTimeout(() => {
        setInfoVisible(false);
      }, 2000); // 2 saniye sonra gizle
      return () => clearTimeout(timer); // Temizleme işlevi
    }
  }, [infoVisible]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user && user.id) {
      try {
        await axios.put(`http://localhost:5000/users/${user.id}`, formData);
        // Güncellenmiş bilgileri localStorage'a kaydet
        localStorage.setItem("user", JSON.stringify(formData));
        // Kullanıcı bilgilerini güncelle
        setUser({ ...formData, id: user.id }); // ID'yi koruyarak güncelle
        setEditing(false);
        setInfo("Kullanıcı bilgileri güncellendi!");
        setInfoVisible(true); // Bilgi mesajını göster
      } catch (error) {
        console.error("Kullanıcı bilgileri güncellenirken bir hata oluştu!", error);
      }
    } else {
      console.error("Kullanıcı ID'si bulunamadı.");
    }
  };

  const handleUser = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleDelete = async () => {
    if (user && user.id) {
      try {
        await axios.delete(`http://localhost:5000/users/${user.id}`);
        localStorage.removeItem("user");
        setUser(null); // Kullanıcıyı null yaparak state'i temizleyin
        setInfo("Kullanıcı silindi!");
        setInfoVisible(true); // Bilgi mesajını göster
        setTimeout(() => {
          navigate("/"); // 2 saniye sonra yönlendir
        }, 2000);
      } catch (error) {
        console.log("Kullanıcı silinirken bir hata oluştu:", error);
      }
    } else {
      console.error("Kullanıcı ID'si bulunamadı.");
    }
  };

  return (
    <div className="profile-page">
      <div className="user-info-container">
        <div className="user-header">Kullanıcı Bilgileri</div>
        {editing ? (
          <form onSubmit={handleSubmit}>
            <div className="user-info">
              <label>İsim:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="user-info">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="user-info">
              <label>Şifre:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button className="logout-button" type="submit">
              Güncelle
            </button>
            <button
              className="logout-button"
              type="button"
              onClick={() => setEditing(false)}
            >
              İptal
            </button>
            <button
              className="logout-button logout-red"
              style={{ backgroundColor: "#f44336" }}
              onClick={handleDelete}
            >
              Sil
            </button>
          </form>
        ) : (
          <>
            <div className="user-info">İsim: {user?.username}</div>
            <div className="user-info">Email: {user?.email}</div>
            <div className="user-info">Şifre: {user?.password}</div>
            <button className="logout-button" onClick={handleEdit}>
              Düzenle
            </button>
            <button className="logout-button" onClick={handleUser}>
              Logout
            </button>
          </>
        )}
      </div>
      {infoVisible && (
        <div className="handle-info">
          {info}
        </div>
      )}
    </div>
  );
};

export default Profile;
