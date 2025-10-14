import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Example API call
    const fetchData = async () => {
      try {
        const response = await axios.get('/');
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>MERN Stack Application</h1>
        <p>{message || 'Connecting to the server...'}</p>
      </header>
    </div>
  );
}

export default App;
