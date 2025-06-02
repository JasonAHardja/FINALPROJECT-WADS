import React, { useEffect, useState } from "react";
import padangImage from "/src/assets/Padang.jpeg";
import axios from "axios";

export default function Ticketing() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "service",
    description: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload();
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  // Assume you store token in localStorage, update if different in your app
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to submit tickets");
    return;
  }

  try {
    console.log("confirmation2")
    // POST request to your backend API - change the URL to your actual backend endpoint
    const response = await axios.post(
      "http://localhost:5001/api/tickets",  // your API URL here
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,  // if your API uses Bearer auth token
          "Content-Type": "application/json",
        },
      }
    );

    // On success, add the returned ticket or refetch tickets
    setTickets((prev) => [...prev, response.data.ticket]);  // adapt if response structure differs
    setFormData({ title: "", category: "service", description: "" });
    console.log("confirmation")
  } catch (error) {
    console.error("Failed to submit ticket:", error);
    alert("Failed to submit ticket");
  }
};

  const styles = {
    body: {
      margin: 0,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#8B0000",
      color: "white",
      minHeight: "100vh",
      overflowX: "hidden",
    },
    logoWrapper: {
      width: "100%",
      backgroundColor: "#c30e2f",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0px 20px",
    },
    logo: {
      width: "70px",
    },
    loginButton: {
      color: "white",
      textDecoration: "none",
      padding: "8px 16px",
      backgroundColor: "#8B0000",
      borderRadius: "5px",
      fontWeight: "bold",
      marginLeft: "10px",
    },
    rightControls: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      paddingRight: "40px",
    },
    mainContent: {
      display: "flex",
      padding: "40px",
      height: "70vh",
      gap: "40px",
    },
    formSection: {
      flex: 1,
      backgroundColor: "#a52a2a",
      padding: "30px",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      height: "70vh",
    },
    ticketsSection: {
      flex: 1.5,
      backgroundColor: "#fafafa",
      color: "#333",
      padding: "30px",
      borderRadius: "10px",
      overflowY: "auto",
      height: "70vh",
    },
    input: {
      width: "80%",
      padding: "10px",
      marginBottom: "20px",
      borderRadius: "5px",
      border: "none",
    },
    select: {
      width: "84%",
      padding: "10px",
      marginBottom: "20px",
      borderRadius: "5px",
      border: "none",
    },
    textarea: {
      width: "90%",
      padding: "10px",
      minHeight: "100px",
      marginBottom: "20px",
      borderRadius: "5px",
      border: "none",
      resize: "vertical",
    },
    submitButton: {
      padding: "10px 20px",
      backgroundColor: "#fff",
      color: "#8B0000",
      fontWeight: "bold",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      alignSelf: "flex-start",
    },
    ticketCard: {
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "15px",
      marginBottom: "15px",
    },
    ticketTitle: {
      fontWeight: "bold",
      fontSize: "18px",
      marginBottom: "5px",
    },
    ticketCategory: {
      fontStyle: "italic",
      fontSize: "14px",
      color: "#666",
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.logoWrapper}>
        <img src="/src/assets/logo.png" alt="Payakumbuah Logo" style={styles.logo} />
        <div style={styles.rightControls}>
          {!isLoggedIn ? (
            <a href="/login" style={styles.loginButton}>Login</a>
          ) : (
            <>
              <a href="/" style={styles.loginButton}>Home</a>
              <a href="/" onClick={handleLogout} style={styles.loginButton}>Logout</a>
            </>
          )}
        </div>
      </div>

      <div style={styles.mainContent}>
        <form style={styles.formSection} onSubmit={handleSubmit}>
          <h2>Submit a Ticket</h2>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            style={styles.input}
            required
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="service">Service</option>
            <option value="food">Food</option>
            <option value="cleanliness">Cleanliness</option>
            <option value="other">Other</option>
          </select>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your issue..."
            style={styles.textarea}
            required
          />
          <button type="submit" style={styles.submitButton}>Submit</button>
        </form>

        <div style={styles.ticketsSection}>
          <h2>Your Tickets</h2>
          {tickets.length === 0 ? (
            <p>No tickets submitted yet.</p>
          ) : (
            tickets.map((ticket, index) => {
              if (!ticket) return null;

              return (
                <div key={index} style={styles.ticketCard}>
                  <div style={styles.ticketTitle}>{ticket.title}</div>
                  <div style={styles.ticketCategory}>{ticket.category}</div>
                  <p>{ticket.description}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}