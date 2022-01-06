class GroupEventsController < ApplicationController

    before_action :find_event, only: [:destroy]
    before_action :is_authorized, only: [:destroy]

    def create
        new_event = GroupEvent.create!(event_params)
        render json: new_event, status: :created
    end
    
    def destroy
        @event.destroy
        head :no_content
    end


    private

    def event_params
        params.permit(:title, :group_id, :start, :end, :all_day, :desc, :color)
    end

    def is_authorized
        permitted = @event.group.admin_users.include?(current_user)
        render json: {error: "Access denied"}, status: :forbidden unless permitted
    end

    def find_event
        @event = GroupEvent.find(params[:id])
    end

end
