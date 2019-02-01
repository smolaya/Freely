class CalendarController < ApplicationController
  def show
    respond_to do |format|
      format.html
      format.json do
        start_date  = Date.parse(params[:start_date])
        end_date    = Date.parse(params[:end_date])
        events  = current_user.events
                    .ordered
                    .between(start_date, end_date)
                    .group_by{|e| e.datetime_start.to_date }
    
        render json: events
      end
    end
  end
end
