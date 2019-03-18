import React from "react";
import ListPokemon from './ListPokemon'
import Search from './Search'
import AddPokemonModal from './AddPokemonModal'
class App extends React.Component{
     constructor(props){
        super(props)
        this.state = {
                         show_spinner : true,
                         show_add_modal : false,
                         pokemons : []
                     }
     }
     componentDidMount(){
          setTimeout(this.refreshPokemon,3000) 
     }
      
     refreshPokemon = (value) => {
          var newPokemons = []
          value = value || ""
          $.ajax({
                                url: "search/"+value,
                                type: "get",
                                async: true,
                                success: (response) =>
                                {
                                 response.map((item)=>{newPokemons.push({
                                    id:item.id,
                                    name:item.name.english,
                                    type:item.type.join(" "),
                                    attack_level:item.base.Attack,
                                    defence_level:item.base.Defense
                                  })})
                                 this.setState({
                                    pokemons : newPokemons,
                                    show_spinner : false
                                })
                                },
                                error: (error) => {
                                }
                 });   


     }


   showNewPokemonModal = () =>{this.setState({show_add_modal : true})}

   unMountModal = () => {console.log("coming to unmount Modal ###################");
       this.setState({show_add_modal : false})
   }
     render(){
       return (
                <div id="main-app">
                  <Search refresh={this.refreshPokemon}/>
                  <div className="ui horizontal divider">OR</div>
                  <div className="ui teal labeled icon button" style={{cursor:"pointer",marginLeft:"44%"}} onClick={this.showNewPokemonModal}>
                        Create New Pokemon 
                        <i className="add icon"></i>
                  </div> 
                  {this.state.show_add_modal ? <AddPokemonModal onHideCall={this.unMountModal}/> : null }
                  {this.state.show_spinner ?
                   <div className="ui grid" style={{margin:"3%"}}> 
                   <div className="ui active inline loader" style={{marginLeft:"50%"}}></div>
                   </div> : 
                   <ListPokemon pokemons={this.state.pokemons}/> 
                  }
                </div>
              ) ;

     }
}
export default App;
