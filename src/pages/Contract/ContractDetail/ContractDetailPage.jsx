import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/ui/Button/Button.jsx";
import Card from "../../../components/ui/Card/Card.jsx";
import HttpClient from "../../../services/HttpClient.js";
import styles from "./ContractDetailPage.module.css";
import WitcherSessionService from "../../../services/WitcherSessionService.js";

function ContractDetailPage() {
    const navigate = useNavigate();
    const { id_contract } = useParams();

    const [contract, setContract] = useState(null);
    const [assignedWitcher, setAssignedWitcher] = useState(null);
    const [error, setError] = useState("");
    const [actionError, setActionError] = useState("");

    const currentWitcher = WitcherSessionService.getWitcher(); // {id, name} ou null

    const loadContract = async () => {
        try {
            setError("");
            setActionError("");
            setContract(null);
            setAssignedWitcher(null);

            const data = await HttpClient.get(`/contracts/${id_contract}`);
            setContract(data);

            if (
                data?.assignedTo &&
                (data?.status === "Assigned" || data?.status === "Completed")
            ) {
                const w = await HttpClient.get(`/witchers/${data.assignedTo}`);
                setAssignedWitcher(w);
            }
        } catch (e) {
            setError(e?.message || "Erreur");
        }
    };

    useEffect(() => {
        loadContract();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id_contract]);

    // --- Règles étape 7.3 ---
    const isAvailable = contract?.status === "Available";
    const isAssigned = contract?.status === "Assigned";
    const canAssign = isAvailable && !!currentWitcher;

    // IMPORTANT : comparaison sur l’id
    const isAssignedToCurrent =
        isAssigned &&
        !!currentWitcher &&
        String(contract?.assignedTo) === String(currentWitcher.id);

    const handleAssign = async () => {
        try {
            setActionError("");

            if (!currentWitcher) {
                setActionError("Aucun sorceleur connecté. Va sur la page de connexion.");
                return;
            }

            // API: PUT /api/contracts/:id/assignedTo
            // (Swagger: body attendu = id sorceleur)
            await HttpClient.put(`/contracts/${id_contract}/assignedTo`, currentWitcher.id);

            await loadContract();
        } catch (e) {
            setActionError(e?.message || "Erreur lors de l'assignation");
        }
    };

    const handleComplete = async () => {
        try {
            setActionError("");

            // API: PUT /api/contracts/:id/status  => passe à Completed
            // (Swagger: body attendu = nouveau status)
            await HttpClient.put(`/contracts/${id_contract}/status`, "Completed");


            await loadContract();
        } catch (e) {
            setActionError(e?.message || "Erreur lors de la finalisation");
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.topBar}>
                <Button onClick={() => navigate("/contract")}>Retour aux contrats</Button>

                {contract && (
                    <Button onClick={() => navigate(`/contract/${contract.id}/edit`)}>
                        Modifier
                    </Button>
                )}
            </div>

            {currentWitcher && (
                <p className={styles.currentWitcher}>
                    Sorceleur courant : {currentWitcher.name}
                </p>
            )}

            {error && <p className={styles.error}>{error}</p>}
            {!error && !contract && <p className={styles.loading}>Chargement...</p>}

            {actionError && <p className={styles.error}>{actionError}</p>}

            {/* Boutons étape 7.3 */}
            {contract && (
                <div className={styles.actions}>
                    {canAssign && (
                        <Button onClick={handleAssign}>
                            Assigner au sorceleur courant
                        </Button>
                    )}

                    {isAssignedToCurrent && (
                        <Button onClick={handleComplete}>Terminer le contrat</Button>
                    )}

                    {!currentWitcher && contract.status !== "Completed" && (
                        <p className={styles.hint}>
                            Connecte-toi en tant que sorceleur pour assigner/terminer un contrat.
                        </p>
                    )}
                </div>
            )}

            {contract && (
                <Card
                    id={contract.id}
                    title={contract.title}
                    description={contract.description}
                    status={contract.status}
                    variant="detail"
                    reward={contract.reward}
                    witcherName={assignedWitcher?.name}
                    showLink={false}
                />
            )}
        </div>
    );
}

export default ContractDetailPage;
