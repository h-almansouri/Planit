class UsersController < ApplicationController

    before_action :find_user, only: [:show, :update, :destroy]

    def index
        render json: User.all, status: :ok
    end

    def show
        render json: @user, status: :ok
    end

    def create
        new_user = User.create!(user_params)
        render json: new_user, status: :created
    end

    def update
        @user.update!(user_params)
        render json: @user, status: :accepted
    end

    def destroy
        @user.destroy
        head :no_content
    end


    private

    def find_user
        @user = User.find(params[:id])
    end

    def user_params
        params.permit(:name, :profile_picture, :birthday, :bio)
    end


end
