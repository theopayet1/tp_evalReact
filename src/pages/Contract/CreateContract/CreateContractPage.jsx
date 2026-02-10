import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button/Button.jsx";
import HttpClient from "../../../services/HttpClient.js";
import ContractForm from "../../../components/contracts/ContractForm/ContractForm.jsx";
import styles from "./CreateContractPage.module.css";
import WitcherSessionService from "../../../services/WitcherSessionService.js";

function CreateContractPage() {
    const navigate = useNavigate();

    const submitCreate = async (payload) => {
        await HttpClient.post("/contracts/", payload);
        navigate("/contract");
    };
    const witcher = WitcherSessionService.getWitcher();

    return (
        <div className={styles.page}>
            <p>Sorceleur courant : {witcher ? witcher.name : "Aucun"}</p>

            <div className={styles.topBar}>
                <Button onClick={() => navigate("/contract")}>Retour aux contrats</Button>
            </div>

            <h1 className={styles.title}>Créer un contrat</h1>

            <ContractForm
                initialValues={{ title: "", description: "", reward: "" }}
                submitLabel="Créer"
                onSubmit={submitCreate}
            />
        </div>
    );
}

export default CreateContractPage;