import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Form = () => {
  const [isLogging, setIsLogging] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSwitch = (event) => {
    event.preventDefault();
    setIsLogging(!isLogging);
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Giriş işlemi
    if (isLogging) {
      try {
        const response = await axios.get(`http://localhost:5000/users?email=${formData.email}`);
        const user = response.data[0];
  
        if (user && user.password === formData.password) {
          // Kullanıcı mevcut ve şifre doğru
          console.log(user);
          localStorage.setItem('user', JSON.stringify(user)); // Kullanıcı bilgilerini localStorage'a kaydet
          navigate("/profile");
        } else {
          // Kullanıcı bulunamadı veya şifre yanlış
          alert("Email veya şifre yanlış!");
        }
      } catch (error) {
        console.error("Giriş yaparken bir hata oluştu!", error);
      }
    } else {
      // Kayıt işlemi
      try {
        // Önce kullanıcı zaten mevcut mu diye kontrol et
        const checkUser = await axios.get(`http://localhost:5000/users?email=${formData.email}`);
        
        if (checkUser.data.length > 0) {
          alert("Bu email ile zaten kayıtlı bir kullanıcı var!");
        } else {
          // Yeni kullanıcı oluştur
          await axios.post('http://localhost:5000/users', {
            username: formData.username,
            email: formData.email,
            password: formData.password
          });
  
          // Kayıt başarılı olduktan sonra giriş yap
          const response = await axios.get(`http://localhost:5000/users?email=${formData.email}`);
          const user = response.data[0];
  
          if (user && user.password === formData.password) {
            // Kullanıcı mevcut ve şifre doğru
            localStorage.setItem('user', JSON.stringify(user)); // Kullanıcı bilgilerini localStorage'a kaydet
            navigate("/profile");
          } else {
            alert("Kayıt sırasında bir hata oluştu!");
          }
        }
      } catch (error) {
        console.error("Kullanıcı oluşturulurken bir hata oluştu!", error);
      }
    }
  };
  

  return (
    <div className="register-container">
      <div className="form-container">
        <div className="form-header">
          <h3>{isLogging ? "Login" : "Sign Up"}</h3>
        </div>
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            {!isLogging && (
              <div className="form-group">
                <input type="text" name="username" placeholder="isim" required onChange={handleChange} />
              </div>
            )}
            <div className="form-group">
              <input type="email" name="email" placeholder="email" required onChange={handleChange} />
            </div>
            <div className="form-group">
              <input type="password" name="password" placeholder="şifre" required onChange={handleChange} />
            </div>
            <button type="submit">{isLogging ? "Login" : "Register"}</button>
            <a href="#" className="account-link" onClick={handleSwitch}>
              {isLogging ? "Yeni Hesap Oluştur" : "Hesabınız var mı?"}
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
