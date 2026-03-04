import { useState, useContext } from "react";
import "../Components/style.css";
import "./SignUpForm.css";
import { Link } from "react-router-dom";
import { auth } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext.jsx";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AppContext);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      // optionally log user in immediately
      login({ email: userCredential.user.email });
      setMessage("Registration successful, redirecting to app...");
      setEmail("");
      setPassword("");
      navigate("/weatherPlusApp");
    } catch (err) {
      console.error("Error signing up:", err);
      setMessage("Failed to sign up: " + err.message);
    }
  };

  return (
    <main className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
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

        <button type="submit">Sign Up</button>

        <p>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
};

export default SignUpForm;
