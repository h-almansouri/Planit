class GroupEventsController < ApplicationController

    def create
        new_event = GroupEvent.create!(event_params)
        render json: new_event, status: :created
    end
    
    private

    def event_params
        params.permit(:title, :group_id, :start, :end, :all_day, :desc, :color)
    end

end
