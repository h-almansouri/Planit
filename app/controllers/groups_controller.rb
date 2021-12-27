class GroupsController < ApplicationController

    before_action :find_group, only: [:show, :update, :destroy]

    def index
        render json: Group.all, status: :ok
    end

    def show
        render json: @group, status: :ok
    end

    def create
        new_group = Group.create!(group_params)
        render json: new_group, status: :created
    end

    def update
        @group.update!(group_params)
        render json: @group, status: :accepted
    end

    def destroy
        @group.destroy
        head :no_content
    end


    private

    def find_group
        @group = Group.find(params[:id])
    end

    def group_params
        params.permit(:name, :group_picture)
    end

end
