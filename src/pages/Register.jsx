import Form from "../components/Form";

const Register = () => {
  return (
    <div className="register-page">
      <div className="grid-container">
        {Array.from({ length: 200 }).map((_, index) => (
          <div className="grid-item" key={index}></div>
        ))}
      </div>
      <Form />
    </div>
  );
};

export default Register;
