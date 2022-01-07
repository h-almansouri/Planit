class MessagesController < ApplicationController
    def index
        render json: Message.all, status: :ok
    end
    
    def create
        new_message = Message.create!(message_params)
        render json: new_message, status: :created
    end

    private

    def message_params
        params.permit(:group_id, :message, :user_id)
    end
end
