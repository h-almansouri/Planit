class PersonalEventsController < ApplicationController

    before_action :find_event, only: [:destroy, :update]
    before_action :is_authorized, only: [:destroy, :update]

    def create
        new_event = PersonalEvent.create!(event_params)
        render json: new_event, status: :created
    end

    def destroy
        @event.destroy
        head :no_content
    end

    def update
        @event.update!(event_params)
        render json: @event, status: :accepted
    end
    
    private

    def is_authorized
        permitted = @event.user == current_user
        render json: {errors: "Access denied"}, status: :forbidden unless permitted
    end

    def event_params
        params.permit(:title, :user_id, :start, :end, :all_day, :desc, :color)
    end

    def find_event
        @event = PersonalEvent.find(params[:id])
    end

end
