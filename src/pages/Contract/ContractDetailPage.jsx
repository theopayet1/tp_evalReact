import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import HttpClient from "../../services/HttpClient.js";
import styles from "./ContractDetailPage.module.css";

function ContractDetailPage() {
    const navigate = useNavigate();
    const { id_contract } = useParams();

    const [contract, setContract] = useState(null);
    const [witcher, setWitcher] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                setError("");
                setContract(null);
                setWitcher(null);

                const data = await HttpClient.get(`/contracts/${id_contract}`);
                setContract(data);

                if (
                    data?.assignedTo &&
                    (data?.status === "Assigned" || data?.status === "Completed")
                ) {
                    const w = await HttpClient.get(`/witchers/${data.assignedTo}`);
                    setWitcher(w);
                }
            } catch (e) {
                setError(e?.message || "Erreur");
            }
        };

        fetchDetail();
    }, [id_contract]);

    return (
        <div className={styles.page}>
            <div className={styles.topBar}>
                <Button onClick={() => navigate("/contract")}>Retour aux contrats</Button>
            </div>

            {error && <p className={styles.error}>{error}</p>}
            {!error && !contract && <p className={styles.loading}>Chargement...</p>}

            {contract && (
                <Card
                    id={contract.id}
                    title={contract.title}
                    description={contract.description}
                    status={contract.status}
                    variant="detail"
                    reward={contract.reward}
                    witcherName={witcher?.name}
                    showLink={false}
                />
            )}
        </div>
    );
}

export default ContractDetailPage;
