import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({ id, title, description, status }) => {
    const statusClass =
        status === "Available"
            ? styles.available
            : status === "Assigned"
                ? styles.assigned
                : styles.completed;

    return (
        <div className={`${styles.card} ${statusClass}`}>
            <div className={styles.header}>
                <h3 className={styles.title}>{title}</h3>
                <span className={styles.status}>{status}</span>
            </div>

            <p className={styles.description}>{description}</p>

            <div className={styles.footer}>
                <Link className={styles.link} to={`/contract/${id}`}>
                    Voir détail
                </Link>
            </div>
        </div>
    );
};

export default Card;
