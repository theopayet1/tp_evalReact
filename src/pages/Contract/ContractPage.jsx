import { useState } from "react";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import HttpClient from "../../services/HttpClient.js";

function ContractPage() {
    const [contracts, setContracts] = useState(null);
    const [error, setError] = useState("");

    const fetchContracts = async () => {
        try {
            setError("");

            const data = await HttpClient.get("/contracts/");
            setContracts(data);
        } catch (e) {
            setError(e?.message || "Erreur");
            setContracts(null);
        }
    };

    return (
        <div>
            <h1>Contrats</h1>

            <Button onClick={fetchContracts}>
                 recuperer contracts
            </Button>

            {error && <p>{error}</p>}

            {Array.isArray(contracts) && (
                <div style={{ display: "grid", gap: "12px", marginTop: "12px" }}>
                    {contracts.map((c) => (
                        <Card
                            key={c.id}
                            title={c.title}
                            description={c.description}
                            status={c.status}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ContractPage;
