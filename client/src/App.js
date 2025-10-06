// client/src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NewComplaint from './pages/NewComplaint';
import EditComplaint from './pages/EditComplaint';
import ComplaintDetails from './components/ComplaintDetails';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/complaints/new" element={<NewComplaint />} />
          <Route path="/complaints/:id" element={<ComplaintDetails />} />
          <Route path="/complaints/:id/edit" element={<EditComplaint />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
