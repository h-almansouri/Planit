class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid




  private

  def not_found(exception)
    render json: {error: "#{exception.model} not found"}
  end

  def record_invalid(exception)
    render json: {errors: exception.record.errors.full_messages}
  end

end
