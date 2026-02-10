import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button/Button.jsx";
import Select from "../../../components/ui/Select/Select.jsx";
import HttpClient from "../../../services/HttpClient.js";
import WitcherSessionService from "../../../services/WitcherSessionService.js";
import styles from "./LoginWitcherPage.module.css";

function LoginWitcherPage() {
    const navigate = useNavigate();

    const [witchers, setWitchers] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const loadWitchers = async () => {
            try {
                setError("");
                const data = await HttpClient.get("/witchers");
                setWitchers(Array.isArray(data) ? data : []);
            } catch (e) {
                setError(e?.message || "Erreur lors du chargement des sorceleurs");
            }
        };

        loadWitchers();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        const w = witchers.find((x) => String(x.id) === String(selectedId));
        if (!w) {
            setError("Veuillez sélectionner un sorceleur.");
            return;
        }

        // on mémorise l’identité dans la session (onglet)
        WitcherSessionService.setWitcher({ id: w.id, name: w.name });

        navigate("/contract");
    };

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Connexion sorceleur</h1>

            {error && <p className={styles.error}>{error}</p>}

            <form className={styles.form} onSubmit={handleSubmit}>
                <Select
                    label="Choisir un sorceleur"
                    id="witcher-select"
                    value={selectedId}
                    onChange={(e) => setSelectedId(e.target.value)}
                    options={witchers.map((w) => ({ value: String(w.id), label: w.name }))}
                    placeholder="Sélectionner..."
                />

                <Button type="submit">Se connecter</Button>
            </form>
        </div>
    );
}

export default LoginWitcherPage;
