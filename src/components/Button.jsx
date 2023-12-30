function Button({ children , onClick , type }) {
  return <button onClick={onClick}>{children}</button>;
}
// type for add a class
export default Button;
