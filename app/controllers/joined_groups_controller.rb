class JoinedGroupsController < ApplicationController

    def create
        JoinedGroup.create!(group_params)
    end

    private

    def group_params
        params.permit(:user_id, :group_id)
    end

end
