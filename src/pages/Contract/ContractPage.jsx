import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button/Button.jsx";
import Card from "../../components/ui/Card/Card.jsx";
import Input from "../../components/ui/Input/Input.jsx";
import Select from "../../components/ui/Select/Select.jsx";

import HttpClient from "../../services/HttpClient.js";
import WitcherSessionService from "../../services/WitcherSessionService.js";

function ContractPage() {
    // Données + erreurs
    const [contracts, setContracts] = useState(null);
    const [error, setError] = useState("");

    // Navigation
    const navigate = useNavigate();

    // Filtres (utilisés côté serveur via query params)
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState(""); // "", "Available", "Assigned", "Completed"

    // Récupère les contrats avec filtres (serveur)
    const fetchContracts = async (nextTitle = title, nextStatus = status) => {
        try {
            setError("");

            // Construction des query params
            const params = new URLSearchParams();
            if (nextTitle?.trim()) params.set("title", nextTitle.trim());
            if (nextStatus) params.set("status", nextStatus);

            const qs = params.toString();

            // Appel API : GET /contracts + params
            const data = await HttpClient.get(`/contracts/${qs ? `?${qs}` : ""}`);
            setContracts(data);
        } catch (e) {
            setError(e?.message || "Erreur");
            setContracts(null);
        }
    };

    // Auto-fetch à chaque changement des filtres (comme demandé)
    useEffect(() => {
        fetchContracts(title, status);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, status]);

    // Sorceleur courant (session)
    const witcher = WitcherSessionService.getWitcher();

    return (
        <div>
            <p>Sorceleur courant : {witcher ? witcher.name : "Aucun"}</p>

            <h1>Contrats</h1>

            {/* Actions */}
            <Button onClick={() => fetchContracts()}>Récupérer contrats</Button>
            <Button onClick={() => navigate("/contract/create")}>Créer un contrat</Button>

            {/* Filtres */}
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

            {/* Erreurs */}
            {error && <p>{error}</p>}

            {/* Liste des contrats */}
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
