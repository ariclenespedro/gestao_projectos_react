import styles from "./Select.module.css";

function Select({ text, value, name, options, handleOnChange }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <select name={name} id={name} onChange={handleOnChange} value={value || ''}>

                {options.map( (option) => 
                    <option value={option.id} key={option.id} >{option.name}</option> 
                )}
            </select>
        </div>
    )

}

export default Select;