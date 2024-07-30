import useStore from "../store"; 
import { useNavigate } from "react-router-dom";
const Profile = () => {
    const { user, clearUser } = useStore(); 

    const navigate = useNavigate();

    const handleUser = () => {
        clearUser();
        navigate("/");
    }

    return (
        <div className="profile-page">
            <div className="user-info-container">
                <div className="user-header">Kullanıcı Bilgileri</div>
                <div className="user-info">{user.name}</div>
                <div className="user-info">{user.email}</div>
                <div className="user-info">{user.password}</div>
                <button className="logout-button" onClick={handleUser}>Logout</button>
            </div>
        </div>
    );
}

export default Profile;
