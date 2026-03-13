import React, { useState } from "react";

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setMessage("Data Saved Successfully");
  }

  return (
    <div>

      <h2>User Form</h2>

      <form onSubmit={handleSubmit}>

        Name:
        <input type="text" onChange={(e) => setName(e.target.value)} />

        <br /><br />

        Email:
        <input type="email" onChange={(e) => setEmail(e.target.value)} />

        <br /><br />

        Age:
        <input type="number" onChange={(e) => setAge(e.target.value)} />

        <br /><br />

        <button type="submit">Submit</button>

      </form>

      <h3>{message}</h3>

      {message && (
        <div>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>Age: {age}</p>
        </div>
      )}

    </div>
  );
}

export default App;
