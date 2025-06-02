import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const { token } = useParams(); // grabs token from /activation/:token
  const [message, setMessage] = useState("Verifying...");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const activateUser = async () => {
      try {
        const res = await axios.post(`http://localhost:5001/api/users/activation`, {
          activation_token: token,
        });
        setMessage(res.data.message || "Account activated!");
        setTimeout(() => navigate("/login"), 3000); // Redirect to login after 3 seconds
      } catch (err) {
        setError(err.response?.data?.message || "Activation failed.");
      }
    };

    if (token) {
      activateUser();
    }
  }, [token, navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        {error ? <h2 style={styles.error}>{error}</h2> : <h2 style={styles.success}>{message}</h2>}
        <p>{!error && "Redirecting to login..."}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  box: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  success: {
    color: "green",
  },
  error: {
    color: "red",
  },
};

export default VerifyEmail;
