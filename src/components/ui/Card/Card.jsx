import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({
                  id,
                  title,
                  description,
                  status,
                  variant = "compact", // "compact" | "detail"
                  reward,
                  witcherName,
                  showLink = true,
              }) => {
    const statusClass =
        status === "Available"
            ? styles.available
            : status === "Assigned"
                ? styles.assigned
                : styles.completed;

    const isCompact = variant === "compact";

    return (
        <div className={`${styles.card} ${statusClass} ${isCompact ? styles.compact : styles.detail}`}>
            <div className={styles.header}>
                <div className={styles.titleBlock}>
                    <h3 className={styles.title}>{title}</h3>
                    {id && <span className={styles.id}>#{id}</span>}
                </div>

                <span className={styles.status}>{status}</span>
            </div>

            <p className={`${styles.description} ${isCompact ? styles.clamp : ""}`}>
                {description}
            </p>

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
