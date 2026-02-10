import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button/Button.jsx";
import WitcherSessionService from "../../services/WitcherSessionService.js";

function HomePage() {
    const navigate = useNavigate();
    const witcher = WitcherSessionService.getWitcher();

    return (
        <div>
            <p>Sorceleur courant : {witcher ? witcher.name : "Aucun"}</p>

            <h1>Home</h1>

            <Button onClick={() => navigate("/contract")}>
                Aller vers contrats
            </Button>
        </div>
    );
}

export default HomePage;
