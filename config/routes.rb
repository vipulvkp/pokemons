Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
   get  'pokemons/home'=> 'pokemon_operations#home' 
   
   get  'pokemons/search/:pattern' => 'pokemon_operations#search' 
   get  'pokemons/search/' => 'pokemon_operations#search' 
   get  'pokemons' => 'pokemon_operations#index'
   get  'pokemons/:id' => 'pokemon_operations#show'
   post 'pokemons' => 'pokemon_operations#create'
   post 'pokemons/:id' => 'pokemon_operations#update' 
end
