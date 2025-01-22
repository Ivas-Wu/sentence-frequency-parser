import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ParserComponent from './components/ParserComponent';
import WordCountComponent from './components/WordCountComponent';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <div className="home-layout">
                <header className="App-header">
                  <h1 className="text-white text-4xl">Welcome to the Frequency Checker</h1>
                  <p className="mb-4 text-xl">This tool helps you find duplicate words in a paragraph.</p>
                  <Link to="/parser">
                    <button className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                      Start
                    </button>
                  </Link>
                  <Link to="/word-counter">
                    <button className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                      Word Counter
                    </button>
                  </Link>
                </header>
                <main className="text-center mt-6">
                </main>
              </div>
            }
          />
          <Route path="/parser" element={<ParserComponent />} />
          <Route path="/word-counter" element={<WordCountComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
