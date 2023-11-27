import styles from "./Input.module.css";

function Input({text, type, value, name, placeholder, handleOnChange}) {
    return(
        <div className={styles.form_control}>
          <label htmlFor={name}>{text}</label>
          <input  type={type} id={name}  placeholder={placeholder} onChange={handleOnChange}  value={value}/>  
        </div>
    )
    
}

export default Input;