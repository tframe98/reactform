import { useState } from 'react';

export default function Authenticate({ token }) {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUsername] = useState('');

  async function handleClick() {
    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(result.message);
        setUsername(result.data.username);
      } else {
        throw new Error(result.message || "Failed to authenticate token");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h2>Authenticate</h2>
      {successMessage && (
        <>
          <p>{successMessage}</p>
          <p>Welcome back, {username}!</p> {/* Display the username */}
        </>
      )}
      {error && <p>{error}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </div>
  );
}
