import { useParams } from "react-router-dom";
import Button from "../../components/ui/Button/Button.jsx";
import { useNavigate } from "react-router-dom";


function ContractsPage() {
    const navigate = useNavigate();
    const { id_contract } = useParams();

    return (
        <div>
            <Button onClick={() => navigate("/Contract")}>
                Aller vers contrats
            </Button>
            <p> {id_contract}</p>
        </div>
    )
}
export default ContractsPage;