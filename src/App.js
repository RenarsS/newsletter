import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [subscribers, setSubscribers] = useState([]);

  let config = {
    headers: {"Access-Control-Allow-Origin": "*"}
  }

  let postConfigs = {
    headers: {'Content-Type': 'multipart/form-data'}
  }

  useEffect(() => {
    // Fetch subscribers from the API on component mount
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await axios.get('https://localhost:7288/api/Emails', config);
      setSubscribers(response.data);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubscribe = async () => {
    if (email.trim() !== '') {
      try {
        // Send a POST request to the API to add a new subscriber
        await axios.post('https://localhost:7288/api/Emails', { emailAddress: email.trim() }, postConfigs);
        // Fetch updated subscribers after adding a new one
        fetchSubscribers();
        setEmail('');
      } catch (error) {
        console.error('Error subscribing:', error);
      }
    }
  };

  return (
      <div className="App">
        <h1>Email Subscription</h1>
        <div>
          <label htmlFor="email">Email:</label>
          <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
          />
          <button onClick={handleSubscribe}>Subscribe</button>
        </div>
        <div>
          <h2>Subscribers:</h2>
          <ul>
            {subscribers.map((subscriber) => (
                <li key={subscriber.emailId}>{subscriber.emailAddress}</li>
            ))}
          </ul>
        </div>
      </div>
  );
}

export default App;
