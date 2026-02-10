import { useEffect, useState } from "react";
import Button from "../../ui/Button/Button.jsx";
import Input from "../../ui/Input/Input.jsx";
import styles from "./ContractForm.module.css";

function ContractForm({
                          initialValues = { title: "", description: "", reward: "" },
                          submitLabel = "Enregistrer",
                          onSubmit,
                      }) {
    const [title, setTitle] = useState(initialValues.title || "");
    const [description, setDescription] = useState(initialValues.description || "");
    const [reward, setReward] = useState(initialValues.reward || "");
    const [error, setError] = useState("");

    useEffect(() => {
        setTitle(initialValues.title || "");
        setDescription(initialValues.description || "");
        setReward(initialValues.reward || "");
    }, [initialValues]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const payload = {
            title: title.trim(),
            description: description.trim(),
            reward: reward.trim(), // backend attend string
        };

        if (!payload.title || !payload.description || !payload.reward) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        try {
            await onSubmit(payload);
        } catch (e2) {
            setError(e2?.message || "Erreur");
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input
                label="Titre"
                id="contract-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                    required
                />
            </div>

            <Input
                label="Récompense"
                id="contract-reward"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                required
            />

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.actions}>
                <Button type="submit">{submitLabel}</Button>
            </div>
        </form>
    );
}

export default ContractForm;