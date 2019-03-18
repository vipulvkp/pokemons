import React from "react";
import PokemonCard from './PokemonCard'
const ListPokemon  = (props) => {
       return (
                <div id="pokemon-list" className="ui grid" style={{marginTop:"3%"}}>
                 {props.pokemons.map((pokemon,index)=>{
                     return <PokemonCard key={pokemon.id} attr={pokemon}/>
                  })
                 }
                </div>
              ) ;

}
export default ListPokemon;
