class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :authenticate_user

  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

  

  private

  def not_found(exception)
    render json: {error: "#{exception.model} not found"}
  end

  def record_invalid(exception)
    render json: {errors: exception.record.errors.full_messages}
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  def authenticate_user
    render json: {error: "Not authorized"}, status: :unauthorized unless current_user
  end

end
