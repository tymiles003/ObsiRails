require 'test_helper'

class ShowsControllerTest < ActionController::TestCase
  setup do
    @show = shows(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:shows)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create show" do
    assert_difference('Show.count') do
      post :create, show: { address_state: @show.address_state, address_street: @show.address_street, address_town: @show.address_town, date: @show.date, description: @show.description, google_map: @show.google_map, phone: @show.phone, place: @show.place, subscribe_google: @show.subscribe_google, subscribe_ical: @show.subscribe_ical, ticket_link: @show.ticket_link, ticket_price: @show.ticket_price, title: @show.title, website: @show.website }
    end

    assert_redirected_to show_path(assigns(:show))
  end

  test "should show show" do
    get :show, id: @show
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @show
    assert_response :success
  end

  test "should update show" do
    patch :update, id: @show, show: { address_state: @show.address_state, address_street: @show.address_street, address_town: @show.address_town, date: @show.date, description: @show.description, google_map: @show.google_map, phone: @show.phone, place: @show.place, subscribe_google: @show.subscribe_google, subscribe_ical: @show.subscribe_ical, ticket_link: @show.ticket_link, ticket_price: @show.ticket_price, title: @show.title, website: @show.website }
    assert_redirected_to show_path(assigns(:show))
  end

  test "should destroy show" do
    assert_difference('Show.count', -1) do
      delete :destroy, id: @show
    end

    assert_redirected_to shows_path
  end
end
