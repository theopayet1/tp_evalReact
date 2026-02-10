import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button/Button.jsx";
import Input from "../../../components/ui/Input/Input.jsx";
import HttpClient from "../../../services/HttpClient.js";
import styles from "./CreateContractPage.module.css";

function CreateContractPage() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [reward, setReward] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setSuccess("");

            const payload = {
                title: title.trim(),
                description: description.trim(),
                reward: reward.trim(),
            };

            if (!payload.title || !payload.description || Number.isNaN(payload.reward)) {
                setError("Veuillez remplir tous les champs correctement.");
                return;
            }

            await HttpClient.post("/contracts/", payload);

            setSuccess("Contrat créé avec succès !");
            setTitle("");
            setDescription("");
            setReward("");

            // option : retourner à la liste
            navigate("/contract");
        } catch (e2) {
            setError(e2?.message || "Erreur lors de la création");
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.topBar}>
                <Button onClick={() => navigate("/contract")}>Aller vers contrats</Button>
            </div>

            <h1 className={styles.title}>Créer un contrat</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    label="Titre"
                    id="contract-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Nid de goules"
                    required
                />

                <div className={styles.group}>
                    <label className={styles.label} htmlFor="contract-description">
                        Description
                    </label>
                    <textarea
                        id="contract-description"
                        className={styles.textarea}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Décris la quête..."
                        required
                    />
                </div>

                <Input
                    label="Récompense"
                    id="contract-reward"
                    type="number"
                    value={reward}
                    onChange={(e) => setReward(e.target.value)}
                    placeholder="Ex: 250"
                    required
                />

                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}

                <div className={styles.actions}>
                    <Button type="submit">Créer</Button>
                </div>
            </form>
        </div>
    );
}

export default CreateContractPage;
