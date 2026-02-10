import { useEffect, useState } from "react";
import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import HttpClient from "../../services/HttpClient.js";
import Input from "../../components/ui/Input/Input.jsx";
import Select from "../../components/ui/Select/Select.jsx";
import {useNavigate} from "react-router-dom";

function ContractPage() {
    const [contracts, setContracts] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [status, setStatus] = useState(""); // "", "Available", "Assigned", "Completed"

    const fetchContracts = async (nextTitle = title, nextStatus = status) => {
        try {
            setError("");

            const params = new URLSearchParams();
            if (nextTitle?.trim()) params.set("title", nextTitle.trim());
            if (nextStatus) params.set("status", nextStatus);

            const qs = params.toString();
            const data = await HttpClient.get(`/contracts/${qs ? `?${qs}` : ""}`);

            setContracts(data);
        } catch (e) {
            setError(e?.message || "Erreur");
            setContracts(null);
        }
    };

    // Option: auto-fetch à chaque changement (comme demandé)
    useEffect(() => {
        fetchContracts(title, status);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, status]);

    return (
        <div>
            <h1>Contrats</h1>

            <Button onClick={() => fetchContracts()}>Récupérer contrats</Button>
            <Button onClick={() => navigate("/contract/create")}> Crée un contrat</Button>


            <Input
                label="Filtre titre"
                id="contract-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Griffon..."
            />

            <Select
                label="Filtre statut"
                id="contract-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                options={[
                    { value: "Available", label: "Available" },
                    { value: "Assigned", label: "Assigned" },
                    { value: "Completed", label: "Completed" },
                ]}
            />

            {error && <p>{error}</p>}

            {Array.isArray(contracts) && (
                <div style={{ display: "grid", gap: "12px", marginTop: "12px" }}>
                    {contracts.map((c) => (
                        <Card
                            key={c.id}
                            id={c.id}
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
