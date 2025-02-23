import React, { useState } from 'react';
import './App.css';
import { OpenAI } from "openai";

function App() {
  const [inputText, setInputText] = useState('Input text here');
  const [outputText, setOutputText] = useState('Output will be shown here');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [loading, setLoading] = useState(false);
  const languages = [
    'English', 'Spanish', 'Chinese', 'Hindi', 'Arabic', 'Portuguese', 'Bengali', 'Russian', 'Japanese', 'Punjabi',
    'German', 'Javanese', 'Wu', 'Malay', 'Telugu', 'Vietnamese', 'Korean', 'French', 'Marathi', 'Tamil',
    'Urdu', 'Turkish', 'Italian', 'Yue', 'Thai'
  ];

  const openai = new OpenAI({
    apiKey:  process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "system", content: `Translate to ${selectedLanguage}: ${inputText}` }],
      });

      setOutputText(response.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching translation:", error);
    } finally {
      setLoading(false);
    }
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
          {loading && (
            <div className="flex justify-center items-center">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
            </div>
          )}
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
