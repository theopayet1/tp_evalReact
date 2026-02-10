import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({
                  id,
                  title,
                  description,
                  status,
                  variant = "compact", // "compact" (liste) | "detail" (page détail)
                  reward,
                  witcherName,
                  showLink = true,
              }) => {
    // Classe CSS selon le statut du contrat
    const statusClass =
        status === "Available"
            ? styles.available
            : status === "Assigned"
                ? styles.assigned
                : styles.completed;

    // Permet d'adapter l'affichage (compact = liste, detail = page détail)
    const isCompact = variant === "compact";

    return (
        <div
            className={`${styles.card} ${statusClass} ${
                isCompact ? styles.compact : styles.detail
            }`}
        >
            {/* En-tête : titre + id + badge statut */}
            <div className={styles.header}>
                <div className={styles.titleBlock}>
                    <h3 className={styles.title}>{title}</h3>
                    {id && <span className={styles.id}>#{id}</span>}
                </div>

                <span className={styles.status}>{status}</span>
            </div>

            {/* Description (tronquée en mode compact) */}
            <p className={`${styles.description} ${isCompact ? styles.clamp : ""}`}>
                {description}
            </p>

            {/* Infos supplémentaires uniquement en mode detail */}
            {!isCompact && (
                <div className={styles.meta}>
                    {reward !== undefined && (
                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>Récompense</span>
                            <span className={styles.metaValue}>{reward}</span>
                        </div>
                    )}

                    {(status === "Assigned" || status === "Completed") && (
                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>Sorceleur</span>
                            <span className={styles.metaValue}>{witcherName || "—"}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Lien vers le détail (désactivable via showLink) */}
            {showLink && id && (
                <div className={styles.footer}>
                    <Link className={styles.link} to={`/contract/${id}`}>
                        Voir détail
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Card;
