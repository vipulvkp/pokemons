require 'test_helper'

class PokemonOperationsControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get pokemon_operations_home_url
    assert_response :success
  end

end
