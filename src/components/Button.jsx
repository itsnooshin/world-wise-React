import styles from './Button.module.css'

function Button({ children , onClick , type }) {
  return <button onClick={onClick} className= {`${styles.btn} ${styles[type]}`}>{children}</button>;
}
// type for add a class
export default Button;
