class SessionsController < ApplicationController

    skip_before_action :authenticate_user, only: [:create]

    def create
        user = User.find_by!(name: params[:name])
        if user.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :ok
        else
            render json: "invalid credentials", status: :unauthorized
        end
    end

    def destroy
        session.delete :user_id
    end


end
