// src/pages/Contract/Edit/EditContractPage.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/ui/Button/Button.jsx";
import HttpClient from "../../../services/HttpClient.js";
import ContractForm from "../../../components/contracts/ContractForm/ContractForm.jsx";
import styles from "./EditContractPage.module.css";

function EditContractPage() {
    const navigate = useNavigate();
    const { id_contract } = useParams();

    const [initialValues, setInitialValues] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                setError("");
                setInitialValues(null);

                const c = await HttpClient.get(`/contracts/${id_contract}`);
                setInitialValues({
                    title: c.title || "",
                    description: c.description || "",
                    reward: String(c.reward ?? ""),
                });
            } catch (e) {
                setError(e?.message || "Erreur");
            }
        };

        load();
    }, [id_contract]);

    const submitEdit = async (payload) => {
        await HttpClient.put(`/contracts/${id_contract}`, payload);
        navigate(`/contract/${id_contract}`);
    };

    return (
        <div className={styles.page}>
            <div className={styles.topBar}>
                <Button onClick={() => navigate(`/contract/${id_contract}`)}>Retour détail</Button>
            </div>

            <h1 className={styles.title}>Modifier le contrat</h1>

            {error && <p className={styles.error}>{error}</p>}
            {!error && !initialValues && <p className={styles.loading}>Chargement...</p>}

            {initialValues && (
                <ContractForm
                    initialValues={initialValues}
                    submitLabel="Modifier"
                    onSubmit={submitEdit}
                />
            )}
        </div>
    );
}

export default EditContractPage;
