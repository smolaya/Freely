class EventsListController < ApplicationController
  def new
    @event = events_list.new
  end

  def create
    @event = events_list.new(allowed_params)
    if @event.save
      session[:events_list_id] = @event.id
      redirect_to root_url, notice: 'Thank you for adding your event!'
    else
      render :new
    end
  end

  private

  def allowed_params
    params.require(:events_list).permit(:name, :latitude, :longitude, :address, :datetime_start, :description, :category)
  end
end