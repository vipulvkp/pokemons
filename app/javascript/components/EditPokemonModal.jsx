import React from "react";
class EditPokemonModal extends React.Component{
    constructor(props){
      super(props);
      this.state={
                   fields : ["Name","Type","Attack Level","Defence Level"],
                   numberOfCustomFields : 0,
                   customFields : []
                 }

    }
    componentDidMount = () => {
     $('.ui.modal').modal({
         onHide : () =>{ console.log("on Hidden");}

    }).modal('show');
    }
    addField = () =>{
     this.setState(
           {numberOfCustomFields: this.state.numberOfCustomFields+1,
            customFields: [...this.state.customFields,{key:"",value:""}]}
     )

    }
    updateCustomFieldInfo = (event,index,field) => {
       const newCustomFields = this.state.customFields;
       if (field === 'key'){
       newCustomFields[index].key = event.target.value
       }else{
       newCustomFields[index].value = event.target.value
       }
       this.setState({
         customFields : newCustomFields
       })
    }


    removeCustomField = (index) => {

           console.log("---");
           console.log("coming tiwh index");
           console.log(index);
           console.log(this.state.customFields);
           
           let newCustom = this.state.customFields.filter(function(item,i){if (i===index){return false}else{return true}})
           console.log(newCustom);
           this.setState(
            {
              numberOfCustomFields: this.state.numberOfCustomFields-1,
              customFields : newCustom
            } 

           )  


    }
    render(){
    let customRows = []
    for(let i = 0;i<this.state.numberOfCustomFields;i++){
     customRows.push(
      <div style={{marginTop:"5%",marginBottom:"5%",textAlign:"center"}} key={"custom_"+i} className="ui grid"><div className="eight wide column"><div className="ui input"><input type="text" value={this.state.customFields[i].key} onChange={this.updateCustomFieldInfo.bind(this,event,i,'key')}/></div></div><div className="six wide column"><div className="ui input" style={{float:"left"}}><input type="text" value={this.state.customFields[i].value} onChange={this.updateCustomFieldInfo.bind(this,event,i,'value')}/></div></div><div className="two wide column"><i style={{marginTop:"10%",cursor:"pointer"}} className="large trash alternate icon" onClick={this.removeCustomField.bind(this,i)}></i></div></div>
     )
    }
    return (
         <div className="ui modal">
           <div className="ui grid">
             <div className="thirteen wide column">
                  <h3 style={{marginLeft:"50%"}}>Add A New Pokemon</h3>
             </div>
           </div>
           <div className="ui grid">
             <div className = "sixteen wide column">
                <a className="ui orange right ribbon label" onClick={this.addField}>Add Custom Field</a>
             </div>
           </div>
           {this.state.fields.map((item,index)=>{
              return <div style={{marginTop:"5%",marginBottom:"5%",textAlign:"center"}} key={index} className="ui grid"><div className="eight wide column">{item} : </div><div className="eight wide column"><div className="ui input" style={{float:"left"}}><input type="text" placeholder={item}/></div></div></div>  
            })
           }
           {customRows}           
           <div className="ui grid" style={{marginBottom:"2%"}}>
           <div className="sixteen wide column" style={{textAlign:"center"}}>
            <button className="positive ui button">Add this Pokemon</button>  
           </div>
           </div>
         </div>


    )
   }
}
export default EditPokemonModal;
