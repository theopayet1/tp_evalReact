//lib
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

//css
import './App.css'

// pages
import HomePage from "./pages/Home/HomePage";
import ContractPage from "./pages/Contract/ContractPage.jsx";
import ContractDetailPage from "./pages/Contract/ContractDetailPage.jsx";



function App() {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path='/home' element={<HomePage />} />
                    <Route path='/Contract' element={<ContractPage />} />
                    <Route path="/contract/:id_contract" element={<ContractDetailPage />} />
                </Routes>
        </Router>
    )
}

export default App;
