import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const languages = [
    'English', 'Spanish', 'Chinese', 'Hindi', 'Arabic', 'Portuguese', 'Bengali', 'Russian', 'Japanese', 'Punjabi',
    'German', 'Javanese', 'Wu', 'Malay', 'Telugu', 'Vietnamese', 'Korean', 'French', 'Marathi', 'Tamil',
    'Urdu', 'Turkish', 'Italian', 'Yue', 'Thai'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "system", content: `Translate to ${selectedLanguage}: ${inputText}` }],
      }),
    });
    const data = await response.json();
    console.log(data);
    debugger;
    setOutputText(data.choices[0].message.content);
  };

  return (
    <div className="App min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Language Translator</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputText">
              Input
            </label>
            <textarea
              id="inputText"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows="4"
            ></textarea>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="language">
              Select Language
            </label>
            <select
              id="language"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {languages.map((language, index) => (
                <option key={index} value={language}>{language}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between mb-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="outputText">
              Output
            </label>
            <textarea
              id="outputText"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={outputText}
              readOnly
              rows="4"
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
