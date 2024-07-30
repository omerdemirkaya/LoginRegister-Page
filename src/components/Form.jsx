import { useState } from "react";
import useStore from "../store";
import { useNavigate } from "react-router-dom";
const Form = () => {
  const [isLogging, setIsLogging] = useState(false);
  const {addUser} = useStore();
  const handleSwitch = (event) => {
    event.preventDefault(); 
    setIsLogging(!isLogging); 
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const name = formData.get("username") || "";
      const email = formData.get("email");
      const password = formData.get("password");
      addUser(name,email,password);
      console.log(name,email,password);
      navigate("/profile");
  }

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
                <input type="text" name="username" placeholder="isim" required />
              </div>
            )}
            <div className="form-group">
              <input type="email" name="email" placeholder="email" required />
            </div>
            <div className="form-group">
              <input type="password" name="password" placeholder="şifre" required />
            </div>
            <button type="submit">{isLogging ? "Login" : "Register"}</button>
            <a href="" className="account-link" onClick={handleSwitch}>
              {isLogging ? "Yeni Hesap Oluştur" : "Hesabınız var mı?"}
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
