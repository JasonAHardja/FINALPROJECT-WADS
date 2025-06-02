import React, { useEffect, useState } from "react";
import padangImage from "/src/assets/Padang.jpeg";

export default function Landing() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload();
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
      marginLeft: "10px",
    },
    container: {
      textAlign: "center",
    },
    heroSection: {
      backgroundImage: `url(${padangImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      padding: "150px 20px",
    },
    h1: {
      fontSize: "48px",
      marginBottom: "10px",
      textShadow: `
        -2px -2px 0 #000,  
        2px -2px 0 #000,
        -2px  2px 0 #000,
        2px  2px 0 #000
      `
    },
    authLinks: {
      marginBottom: "30px",
      fontSize: "18px",
    },
    link: {
      color: "white",
      textDecoration: "underline",
      margin: "0 5px",
    },
    about: {
      marginTop: "100px",
      padding: "0 40px",
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
  };

  return (
    <div style={styles.body}>
      <div style={styles.logoWrapper}>
        <img
          src="/src/assets/logo.png"
          alt="Payakumbuah Logo"
          style={styles.logo}
        />

        <div style={styles.rightControls}>
          {!isLoggedIn ? (
              <>
                <a href="/register" style={styles.loginButton}>Register</a>
                <a href="/login" style={styles.loginButton}>Login</a>
              </>
          ) : (
            <>
              <a href="/tickets" style={styles.loginButton}>Tickets</a>
              <a href="/" onClick={handleLogout} style={styles.loginButton}>Logout</a>
            </>
          )}
        </div>
      </div>

      <div style={{ ...styles.container, ...styles.heroSection }}>
        <h1 style={styles.h1}>Welcome to Payakumbuah</h1>
      </div>

      <div style={styles.container}>
        <div style={styles.about}>
          <h2>ABOUT US</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
        </div>
      </div>
    </div>
  );
}

