import { useState } from "react";

const Form = () => {
  const [isLogging, setIsLogging] = useState(false);

  const handleSwitch = (event) => {
    event.preventDefault(); // Prevent the default link behavior
    setIsLogging(!isLogging); // Toggle the state
  };

  return (
    <div className="register-container">
      <div className="form-container">
        <div className="form-header">
          <h3>{isLogging ? "Login" : "Sign Up"}</h3>
        </div>
        <div className="form-content">
          <form>
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
