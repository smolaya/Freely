class EventsController < ApplicationController

  def index
    events = Event.all
    events = events.search(params[:term]) if params[:term].present?
    events = events.after(params[:start_date]) if params[:start_date].present?
    events = events.before(params[:end_date]) if params[:end_date].present?
    events = events.near(params[:location], params[:radius].to_i) if params[:location].present? && params[:radius].present?

    render json: events
  end

end
