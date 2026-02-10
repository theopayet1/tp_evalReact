import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button/Button.jsx";

function HomePage() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Home</h1>

            <Button onClick={() => navigate("/contract")}>
                Aller vers contrats
            </Button>
        </div>
    );
}

export default HomePage;
