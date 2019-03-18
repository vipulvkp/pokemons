class PokemonOperationsController < ApplicationController
  def home
   
  end


  def search 
  pattern = params[:pattern] || ""
  final_search_result = []
  if !pattern.present?
  data = JSON.parse(File.read("data/pokedex.json"))[0..9] 
  else
  data = JSON.parse(File.read("data/pokedex.json"))
  end 
 
  data.each{|pokemon|
      final_search_result << pokemon if (pokemon["name"]["english"] =~ Regexp.new(pattern) || pokemon["type"].join(" ") =~ Regexp.new(pattern))
   }
  render :json=>final_search_result.to_json
  end
end
