import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../../components/ui/Button/Button.jsx";
import ContractForm from "../../../components/contracts/ContractForm/ContractForm.jsx";

import HttpClient from "../../../services/HttpClient.js";

import styles from "./EditContractPage.module.css";

function EditContractPage() {
    // Navigation + récupération de l'id depuis l'URL (/contract/:id_contract/edit)
    const navigate = useNavigate();
    const { id_contract } = useParams();

    // Valeurs initiales du formulaire (chargées depuis l'API) + gestion d'erreur
    const [initialValues, setInitialValues] = useState(null);
    const [error, setError] = useState("");

    // Chargement du contrat à éditer au montage (ou si l'id change)
    useEffect(() => {
        const load = async () => {
            try {
                setError("");
                setInitialValues(null);

                // GET /contracts/:id => préremplissage du formulaire
                const c = await HttpClient.get(`/contracts/${id_contract}`);
                setInitialValues({
                    title: c.title || "",
                    description: c.description || "",
                    // reward attendu en string côté backend
                    reward: String(c.reward ?? ""),
                });
            } catch (e) {
                setError(e?.message || "Erreur");
            }
        };

        load();
    }, [id_contract]);

    // Soumission : PUT /contracts/:id puis redirection vers le détail
    const submitEdit = async (payload) => {
        await HttpClient.put(`/contracts/${id_contract}`, payload);
        navigate(`/contract/${id_contract}`);
    };

    return (
        <div className={styles.page}>
            <div className={styles.topBar}>
                <Button onClick={() => navigate(`/contract/${id_contract}`)}>
                    Retour détail
                </Button>
            </div>

            <h1 className={styles.title}>Modifier le contrat</h1>

            {/* Etat erreur / chargement */}
            {error && <p className={styles.error}>{error}</p>}
            {!error && !initialValues && <p className={styles.loading}>Chargement...</p>}

            {/* Formulaire partagé (Create/Edit) */}
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
