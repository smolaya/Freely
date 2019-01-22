class EventsController < ApplicationController

  # AW I dont **think** this code is doing anything
  # def new
  #   @event = Event.new
  # end

  # def create
  #   @event = Event.new(allowed_params)
  #   if @event.save
  #     redirect_to root_url, notice: 'Thank you for adding your event!'
  #   else
  #     render :new
  #   end
  # end

  def index
    @events = Event.all
    render json: @events
  end

  private

  # AW I dont **think** this code is doing anything
  # def allowed_params
  #   params.require(:event)
  #     .permit(:name, :latitude, :longitude, :address, :datetime_start, :description, :category)
  # end
end