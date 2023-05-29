const express = require('express');
const { ChatGPT } = require('openai');

const app = express();
const port = 4000;

// Set up OpenAI API credentials
const openai = new ChatGPT({
  apiKey: 'YOUR_OPENAI_API_KEY',
  model: 'gpt-3.5-turbo',
});

app.use(express.json());

app.post('/process-message', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.complete([
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: message },
    ]);

    const botResponse = response.choices[0].message.content;

    res.json({ response: botResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
