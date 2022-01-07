class MessagesController < ApplicationController
    def index
        render json: Message.all, status: :ok
    end
end
