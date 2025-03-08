import React, { useState } from "react";
import Login from "./Login"; // Make sure the path is correct

const ParentComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Define the onLogin function
  const handleLogin = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <div>
      <Login onLogin={handleLogin} /> {/* Pass the onLogin function to Login */}
      {isAuthenticated ? <h1>Welcome, You are logged in!</h1> : <h1>Please Log In</h1>}
    </div>
  );
};

export default ParentComponent;
