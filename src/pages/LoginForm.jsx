import { useState, useContext } from "react";
import "../Components/style.css";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import { auth } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext.jsx";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AppContext);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      login({ email: userCredential.user.email });
      setMessage("Login successful!");
      setEmail("");
      setPassword("");
      navigate("/weatherPlusApp");
    } catch (err) {
      console.error("Login failed:", err);
      setMessage("Login failed: " + err.message);
    }
  };
  return (
    <main className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {message && <div className="form-message">{message}</div>}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p>
          Don’t have an account? <Link to="/signup">Register</Link>
        </p>
      </form>
    </main>
  );
};

export default LoginForm;
