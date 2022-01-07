class JoinedGroupsController < ApplicationController

    def create
        JoinedGroup.create!(group_params)
    end

    # def destroy
    #     group = JoinedGroup.find_by!(user_id: params[:user_id], group_id: params[:group_id])
    #     group.destroy
    #     head :no_content
    # end

    private

    def group_params
        params.permit(:user_id, :group_id)
    end

end
