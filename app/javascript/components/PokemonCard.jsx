import React from "react";
import EditPokemonModal from './EditPokemonModal'
class PokemonCard extends React.Component{
       constructor(props){
         super(props);
               this.state = {attr : this.props.attr, 
                             editMode : [false,false,false],
                             numberOfCustomFields : 0 ,
                             customFields : [],
                             focusOutArray : Array(3).fill(false),
                             opacity : 1,
                             show_save_caption : false
                            }
       }
       addField = () =>{
	     this.setState(
		   {numberOfCustomFields: this.state.numberOfCustomFields+1,
		    customFields: [...this.state.customFields,{key:"",value:""}],
                    focusOutArray : [...this.state.focusOutArray,false],
                    editMode : [...this.state.editMode,true]
                   }
	     )

       }
       showEditMode = () => {
          this.setState({editMode : Array(this.state.editMode.length).fill(true),
                         focusOutArray : Array(this.state.focusOutArray.length).fill(false)
          })
       }
       disableEditMod = () => {
           console.log("COMMING TO DISBALE EDIT MODE");
           let newCustomFields = this.state.customFields.filter(function(item,i){if (item.key===""){return false}else{return true}})
           this.setState({editMode : Array(this.state.editMode.length).fill(false),
                         focusOutArray : Array(this.state.focusOutArray.length).fill(true),
                         customFields : newCustomFields,
                         numberOfCustomFields : newCustomFields.length,
                         opacity : 0.3,
                         show_save_caption : true

          },function(){
            setTimeout(()=>{this.setState({opacity:1,show_save_caption:false})},3000)
         })
        }
       updateNewValue = (event,key) =>{
          return function(event){
           var value = event.target.value;
           console.log("ok value is ");
           console.log(value);
           var tmpattr = {...this.state.attr}
           tmpattr[key] = value
           this.setState({
              attr : tmpattr
              }
           )
          }
        }

       updateCustomFieldInfo = (event,index,field) => {
	       return function(event){
		       const newCustomFields = [...this.state.customFields];
		       if (field === 'key'){
		       newCustomFields[index].key = event.target.value
		       }else{
		       newCustomFields[index].value = event.target.value
		       }
		       this.setState({
			 customFields : newCustomFields
		       })
	       }
       }
        backToText = (event,index) => {
             console.log("COMING TO BLUR");
             const tmpEditMode = [...this.state.editMode]
             tmpEditMode[index] = false
             const tmpFocusOut = [...this.state.focusOutArray]
             tmpFocusOut[index] = true
             this.setState(
             {
              focusOutArray : tmpFocusOut
             },function(){
                 setTimeout(()=>{
                    this.setState({editMode : tmpEditMode})
               },3000)
              }.bind(this)
             ) 
        }
       removeCustomField = (index) => {
           let newCustom = this.state.customFields.filter(function(item,i){if (i===index-3){return false}else{return true}})
           let tmpFocusOut = this.state.focusOutArray.filter(function(item,i){if (i===index){return false}else{return true}})
           let tmpEditMode = this.state.editMode.filter(function(item,i){if (i===index){return false}else{return true}})
           this.setState(
            {
              numberOfCustomFields: this.state.numberOfCustomFields-1,
              customFields : newCustom,
              focusOutArray : tmpFocusOut,
              editMode : tmpEditMode
            }

           )
       } 
       render(){ 
       let divStyle = {width:"40%",height:"15%",float:"left",marginLeft:"5%"}
       let customRows = []
       for(let i = 0;i<this.state.numberOfCustomFields;i++){
        if(this.state.focusOutArray[i+3]) {
          var b =  (<div className="ui active inline loader"></div>)
        } else{
          var b  = null}
        if(this.state.editMode[i+3]){
         var a  = (<div className="seven wide column ui input"><input type="text" value={this.state.customFields[i].value} onChange={this.updateCustomFieldInfo(event,i,'value').bind(this)} placeholder="Attribute Value"/>{b}</div>)
        }else{
         var a  = <div className="seven wide column"><h3>{this.state.customFields[i].value}</h3></div>
        }
        
        customRows.push(
          <div className="event" key={"custom_card_"+i}>
                        <div className="content">
                          <div className="summary ui grid">
                          {this.state.editMode[i+3] ?  <div className="five wide column ui input"><input type="text" value={this.state.customFields[i].key} onChange={this.updateCustomFieldInfo(event,i,'key').bind(this)} placeholder="Attribute Name"/></div> : <div className="five wide column"><h3>{this.state.customFields[i].key} : </h3></div>}
                             <div className="two wide column">:</div>
                             {a}
                             {this.state.editMode[i+3] ? <div style={{float:"right",marginTop:"2.5%"}}><i style={{cursor:"pointer"}} className="large trash alternate icon" onClick={this.removeCustomField.bind(this,i+3)}></i></div> : null}
                          </div>
                        </div>
         </div>
        )
       }
       let isItEdit = this.state.editMode.reduce(function(item,initial_value=true){ return (initial_value || item)})
       let showAdd = ((isItEdit))   ? (<div onClick={this.addField} style={{textAlign:"center",cursor:"pointer",marginTop:"5%",backgroundColor:"lemonchiffon"}}>
                <button className="ui basic button"><i className="plus large square outline icon" style={{color:"green"}}></i>Add Attributes</button>
       </div>) : null 
       let contract_opacity = this.state.opacity
       return (
               <div className="ui card" style={divStyle}>
                  <div className="content" style={{backgroundColor:"beige"}}>
                        <div className="header" style={{color:"green"}}>PokeMon Name : {this.state.attr.name}
                          {this.state.show_save_caption ? <span style={{float:"center",marginLeft:"13%",color:"grey"}}>Saving<div style={{marginLeft:"2%"}} className="ui active inline loader"></div></span> : null}
                          {isItEdit ? <span style={{float:"right"}}><button className="ui basic button" onClick={this.disableEditMod}><i className="large angle left icon" style={{color:"green"}}></i>Back to Display</button></span> : <span  onClick={this.showEditMode} style={{float:"right",cursor:"pointer",color:"grey"}}><i className="edit large outline icon"></i></span>}
                        </div>
                  </div>

                  <div className="content" style={{opacity:contract_opacity}}>
                    <h4 className="ui sub header">Details</h4>
                    <div className="ui small feed">
                      <div className="event">
                        <div className="content">
                          <div className="summary ui grid">
                             <div className="five wide column"><h3>Type</h3></div><div className="two wide column">:</div> {this.state.editMode[0] ? <div className="ui input"><input type="text" value={this.state.attr.type} onChange={this.updateNewValue(event,"type").bind(this)}/>{this.state.focusOutArray[0] ? <div className="ui active inline loader"></div>: null }</div> : <div className="seven wide column"><h3>{this.state.attr.type}</h3></div>}
                          </div>
                        </div>
                      </div>
                      <div className="event">
                        <div className="content">
                          <div className="summary ui grid">
                            <div className="five wide column"><h3> Attack Level</h3></div><div className="two wide column">:</div> {this.state.editMode[1] ? <div className="ui input"><input type="text" value={this.state.attr.attack_level} onChange={this.updateNewValue(event,"attack_level").bind(this)}/>{this.state.focusOutArray[1] ? <div className="ui active inline loader"></div>: null }</div> : <div className="seven wide column"><h3>{this.state.attr.attack_level}</h3></div>}
                          </div>
                        </div>
                      </div>
                      <div className="event">
                        <div className="content">
                          <div className="summary ui grid">
                             <div className="five wide column"><h3>Defence Level : </h3></div><div className="two wide column">:</div> {this.state.editMode[2] ? <div className="ui input"><input type="text" value={this.state.attr.defence_level} onChange={this.updateNewValue(event,"defence_level").bind(this)}/>{this.state.focusOutArray[2] ? <div className="ui active inline loader"></div>: null }</div> : <div className="seven wide column"><h3>{this.state.attr.defence_level}</h3></div>}
                          </div>
                        </div>
                      </div>
                      {customRows}
                      {showAdd}
                     </div>
                    </div>
                   </div>
              ) ;
         }
}
export default PokemonCard;
