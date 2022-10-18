const InputField = (props: any): (JSX.Element) => {
  return (
    <div className="inputField" >
      <label>{props.label}</label>
      <input 
        type={props.type} 
        maxLength={props.maxLength}
        placeholder={props.placeholder}
        required={props.required}/>
    </div>
  );
};

InputField.defaultProps = {
  type:"text",
  maxLength:100,
  placeholder:"",
  required:false
}
export default InputField;
