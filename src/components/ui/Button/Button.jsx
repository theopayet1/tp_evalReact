import styles from './Button.module.css';

const Button = ({ children, type = "button", onClick }) => {
    return (
        <button type={type} onClick={onClick} className={styles.btn}>
            {children}
        </button>
    );
};
export default Button;