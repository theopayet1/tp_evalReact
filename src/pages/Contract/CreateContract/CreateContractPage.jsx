import { useNavigate } from "react-router-dom";

import Button from "../../../components/ui/Button/Button.jsx";
import ContractForm from "../../../components/contracts/ContractForm/ContractForm.jsx";

import HttpClient from "../../../services/HttpClient.js";
import WitcherSessionService from "../../../services/WitcherSessionService.js";

import styles from "./CreateContractPage.module.css";

function CreateContractPage() {
    // Navigation
    const navigate = useNavigate();

    // Sorceleur courant (session) : affichage en haut de page
    const witcher = WitcherSessionService.getWitcher();

    // Soumission : POST /contracts puis retour à la liste
    const submitCreate = async (payload) => {
        await HttpClient.post("/contracts/", payload);
        navigate("/contract");
    };

    return (
        <div className={styles.page}>
            <p>Sorceleur courant : {witcher ? witcher.name : "Aucun"}</p>

            <div className={styles.topBar}>
                <Button onClick={() => navigate("/contract")}>Retour aux contrats</Button>
            </div>

            <h1 className={styles.title}>Créer un contrat</h1>

            {/* Formulaire partagé (Create/Edit) */}
            <ContractForm
                initialValues={{ title: "", description: "", reward: "" }}
                submitLabel="Créer"
                onSubmit={submitCreate}
            />
        </div>
    );
}

export default CreateContractPage;
