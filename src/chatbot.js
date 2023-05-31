
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chatbot } from 'react-chatbot-kit';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    // Function to fetch initial chatbot message or perform any other initialization
    const fetchInitialMessage = async () => {
      try {
        const response = await axios.get('API_URL');
        const initialMessage = response.data.message;
        setMessages([initialMessage]);
      } catch (error) {
        console.error('Error fetching initial chatbot message:', error);
      }
    };

    fetchInitialMessage();
  }, []);

  const handleUserMessage = async (message) => {
    // Function to send user message to the chatbot API and update the messages state
    try {
      const response = await axios.post('API_URL', { message });
      const botReply = response.data.reply;

      if (botReply.followUpQuestion) {
        // If the bot reply includes a follow-up question, ask it
        setMessages([...messages, message, botReply.message, botReply.followUpQuestion]);
      } else {
        setMessages([...messages, message, botReply.message]);
      }
    } catch (error) {
      console.error('Error sending user message to the chatbot:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (userInput.trim() !== '') {
        handleUserMessage(userInput.trim());
        setUserInput('');
      }
    }
  };
  function sendMessage() {
    const userInput = document.querySelector('.user-input input');
    const message = userInput.value;
  
    if (message.trim() !== '') {
      userInput.value = '';
      displayUserMessage(message);
      simulateBotTyping();
      // Perform other chatbot actions or API calls here
    }
 
  

  return (
    <div>
      {/* Display chat messages */}
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}

      {/* Input field for user message */}
      <input
        type="text"
        placeholder="Type your message"
        value={userInput}
        onChange={(event) => setUserInput(event.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default Chatbot;
