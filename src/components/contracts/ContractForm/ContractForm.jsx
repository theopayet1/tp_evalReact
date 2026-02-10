import { useEffect, useState } from "react";

import Button from "../../ui/Button/Button.jsx";
import Input from "../../ui/Input/Input.jsx";

import styles from "./ContractForm.module.css";

function ContractForm({
                          // Valeurs initiales (vide pour Create, préremplies pour Edit)
                          initialValues = { title: "", description: "", reward: "" },
                          submitLabel = "Enregistrer",
                          onSubmit,
                      }) {
    // Champs du formulaire + gestion d'erreur locale
    const [title, setTitle] = useState(initialValues.title || "");
    const [description, setDescription] = useState(initialValues.description || "");
    const [reward, setReward] = useState(initialValues.reward || "");
    const [error, setError] = useState("");

    // Quand initialValues change (ex: après fetch en Edit), on réinjecte dans le form
    useEffect(() => {
        setTitle(initialValues.title || "");
        setDescription(initialValues.description || "");
        setReward(initialValues.reward || "");
    }, [initialValues]);

    // Validation + envoi au parent (Create/Edit)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Payload attendu par l'API (reward en string)
        const payload = {
            title: title.trim(),
            description: description.trim(),
            reward: reward.trim(),
        };

        // Validation minimale
        if (!payload.title || !payload.description || !payload.reward) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        try {
            // onSubmit est fourni par la page (POST ou PUT)
            await onSubmit(payload);
        } catch (e2) {
            setError(e2?.message || "Erreur");
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {/* Titre */}
            <Input
                label="Titre"
                id="contract-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            {/* Description */}
            <div className={styles.group}>
                <label className={styles.label} htmlFor="contract-description">
                    Description
                </label>
                <textarea
                    id="contract-description"
                    className={styles.textarea}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>

            {/* Récompense */}
            <Input
                label="Récompense"
                id="contract-reward"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                required
            />

            {/* Erreur de validation / API */}
            {error && <p className={styles.error}>{error}</p>}

            {/* Action */}
            <div className={styles.actions}>
                <Button type="submit">{submitLabel}</Button>
            </div>
        </form>
    );
}

export default ContractForm;
