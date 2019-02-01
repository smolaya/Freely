class ResultsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    @result = Result.last
    respond_to do |format|
      format.html
      format.json do
        render json: {
          result: @result
        }
      end
    end
  end

  def create
    @result = Result.new(result_params)
    @result.save
    render json: @result
  end

  private
  def result_params
    params.require(:result).permit(:street, :city, :state, :zip)
  end
end
