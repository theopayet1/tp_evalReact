import styles from "./Select.module.css";

const Select = ({ label, id, options = [], value, onChange, placeholder = "Tous", ...props }) => {
    return (
        <div className={styles.group}>
            {label && (
                <label htmlFor={id} className={styles.label}>
                    {label}
                </label>
            )}

            <select
                id={id}
                className={styles.select}
                value={value}
                onChange={onChange}
                {...props}
            >
                <option value="">{placeholder}</option>

                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
