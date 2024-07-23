import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './containers/HomePage';
import AddContactPage from './containers/AddContactPage';
import EditContactPage from './containers/EditContactPage';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/add" element={<AddContactPage />} />
                <Route path="/edit/:id" element={<EditContactPage />} />
            </Routes>
        </Router>
    );
};

export default App;
