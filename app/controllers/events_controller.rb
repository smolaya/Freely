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
    @event = current_user.events.new(event_params)
    if @event.save
      respond_to do |format|
        format.html{ redirect_to root_path, notice: 'Event created!' }
        format.json{ render json: @event }
      end
    else
      flash[:alert] = "oops"
      redirect_back(fallback_location: root_path)
    end
  end

  private
  def event_params
    params.
      require(:event).
      permit(:name, :datetime_start, :datetime_end, :description, :category, :address)              
  end
end


