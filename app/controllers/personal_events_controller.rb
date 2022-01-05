class PersonalEventsController < ApplicationController

    def create
        new_event = PersonalEvent.create!(event_params)
        render json: new_event, status: :created
    end
    
    private

    def event_params
        params.permit(:title, :user_id, :start, :end, :all_day, :desc, :color)
    end

end
