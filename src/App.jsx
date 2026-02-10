//lib
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

//css
import './App.css'

// pages
import HomePage from "./pages/Home/HomePage";



function App() {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path='/home' element={<HomePage />} />
                </Routes>
        </Router>
    )
}

export default App;
