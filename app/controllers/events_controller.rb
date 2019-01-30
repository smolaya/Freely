class EventsController < ApplicationController

  def index
    events = Event.all
    events = events.search(params[:term]) if params[:term].present?
    events = events.after(params[:start_date]) if params[:start_date].present?
    events = events.before(params[:end_date]) if params[:end_date].present?
    events = events.near(params[:location], params[:radius].to_i) if params[:location].present? && params[:radius].present?

    render json: events
  end

  def new
    @events = Event.new
  end

  def create
    @events = Event.new event_params

    redirect_to root_path, notice: 'Event created!'
  end

  private
  def event_params
    params.
      require(:event).
      permit(:name, :datetime_start, :datetime_end, :description, :category, :address)              
  end
end


