import 'React' from "react";
const TextInput = (props) => {
    let element =  props.edit_mode ?  : <a> : </a> {props.value} 
    return (
        {props.edit_mode ? 
          <div className="ui input"><input type="text" 
          : <a>props.key : </a> {props.value} 

    )


}
export default TextInput;
