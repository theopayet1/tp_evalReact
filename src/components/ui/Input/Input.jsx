import styles from './Input.module.css';

const Input = ({ label, id, type = "text", ...props }) => {
    return (
        <div className={styles.group}>
            {label && <label htmlFor={id} className={styles.label}>{label}</label>}
            <input
                id={id}
                type={type}
                className={styles.input}
                {...props}
            />
        </div>
    );
};
export default Input;