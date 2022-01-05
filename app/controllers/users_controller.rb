class UsersController < ApplicationController

    skip_before_action :authenticate_user, only: [:create, :me]
    before_action :find_user, only: [:update, :destroy]

    def index
        render json: User.all, status: :ok
    end

    def create
        new_user = User.create!(user_params)
        session[:user_id] = new_user.id
        render json: new_user, status: :created
    end

    def show
        user = User.find(params[:id])
        render json: user, serializer: UserGroupsSerializer, status: :ok
    end

    def update
        if @user == current_user
            @user.update!(user_params)
            render json: @user, status: :accepted
        else
            render json: {error: "Not authorized"}, status: :unauthorized
        end
    end

    def destroy
        if @user == current_user
            @user.destroy
            head :no_content
        else
            render json: {error: "Not authorized"}, status: :unauthorized
        end
    end

    def me
        if current_user
            render json: current_user, status: :ok
        else
            render json: {error: "Not logged in"}, status: :unauthorized
        end
    end

    def admin_groups
        render json: current_user.group_admins, status: :ok
    end

    def joined_groups
        render json: current_user.group_joins, status: :ok
    end

    def my_messages
        render json: current_user.messages, status: :ok
    end

    def personal_events
        render json: current_user.personal_events, status: :ok
    end

    def group_events
        render json: current_user, serializer: UserGroupEventListSerializer, status: :ok
    end

    def all_events
        render json: current_user, serializer: AllEventsSerializer, status: :ok
    end

    def all_groups
        render json: current_user, serializer: AllUserGroupSerializer, status: :ok
    end

    private

    def user_params
        params.permit(:username, :profile_picture, :birthday, :bio, :password, :password_confirmation)
    end

    def find_user
        @user = User.find(params[:id])
    end

end
