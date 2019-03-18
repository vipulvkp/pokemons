import React from "react";
const Search = (props) => {

       var getNewPokemon = (event) => {
       if(event.key === 'Enter'){
        let value = event.target.value
        props.refresh(value);
       }
       }
       return (
                <div className="ui search" style={{marginTop:"5%"}}>
		  <div className="ui icon input" style={{width:"50%",marginLeft:"25%"}}>
		    <input className="prompt" type="text" placeholder="Search for a pokemon..." onKeyPress={getNewPokemon}/>
		    <i className="search icon"></i>
		  </div>
		</div>
              ) ;
}
export default Search;
