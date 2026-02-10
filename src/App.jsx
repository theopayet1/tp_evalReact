//lib
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

//css
import './App.css'

// pages
import HomePage from "./pages/Home/HomePage";
import ContractPage from "./pages/Contract/ContractPage.jsx";
import ContractDetailPage from "./pages/Contract/ContractDetail/ContractDetailPage.jsx";
import CreateContractPage from "./pages/Contract/CreateContract/CreateContractPage.jsx";
import EditContractPage from "./pages/Contract/EditContractPage/EditContractPage.jsx";



function App() {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path='/home' element={<HomePage />} />
                    <Route path='/contract' element={<ContractPage />} />
                    <Route path='/contract/create' element={<CreateContractPage />} />
                    <Route path="/contract/:id_contract" element={<ContractDetailPage />} />
                    <Route path="/contract/:id_contract/edit" element={<EditContractPage />} />
                </Routes>
        </Router>
    )
}

export default App;
