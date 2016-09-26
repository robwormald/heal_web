class Api::ChatController < ApiController
  def index
    @chat_rooms = ChatRoom.all
    render json: @chat_rooms
  end
end
