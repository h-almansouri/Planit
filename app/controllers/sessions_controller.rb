class SessionsController < ApplicationController

    skip_before_action :authenticate_user, only: [:create]

    def create
        user = User.find_by!(name: params[:name])
        session[:user_id] = user.id
    end

    def destroy
        session.delete :user_id
    end


end
