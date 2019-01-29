class PlacesController < ApplicationController
  def index
    respond_to do |format|
      format.html do
        @coordinates = request.location.coordinates.reverse
        @coordinates = [0.0, 0.0] if @coordinates.empty?
      end
      format.json do
        @events = Event.all
        render json:  {
                        type: "FeatureCollection",
                        features: @events.map do |event|
                          {
                            type: "Feature",
                            geometry: {
                              type: "Point",
                              coordinates: [event.longitude, event.latitude]
                            },
                            properties: {
                              name: place.name,
                              id: place.id
                            }
                          }
                        end
                      }
      end
    end
  end

  def create
    @place = Place.new(place_params)
    @place.save
  end

  private

  def place_params
    params.require(:place).permit(:name, :street, :city, :state, :country, :longitude, :latitude)
  end
end
