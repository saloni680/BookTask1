import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage';
import AddBook from './Components/AddBook';
import EditBook from './Components/EditBook';
import BookDetails from './Components/BookDetails'; // Import BookDetails
import './App.css'; // Import the CSS file

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/edit/:id" element={<EditBook />} />
          <Route path="/book/:id" element={<BookDetails />} /> {/* Route for BookDetails */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;