class Api::ChatController < ApiController
  def index
    @chat_rooms = ChatRoom.all
    render json: @chat_rooms
  end

  def show
    @messages = ChatMessage.where({ chat_room_id: params[:id] }).includes(:user)
    render json: @messages
  end
end
