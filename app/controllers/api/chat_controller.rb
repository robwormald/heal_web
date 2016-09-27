class Api::ChatController < ApiController
  def index
    @chat_rooms = ChatRoom.all
    render json: @chat_rooms
  end

  def create
    message = ChatMessage.new(permit_params)
    message.user = current_user
    message.chat_room_id = params[:id]
    message.save
    ChatMessageJob.perform_later(message)
    render json: :ok
  end

  def show
    @messages = ChatMessage.where({ chat_room_id: params[:id] }).includes(:user).order(id: :desc).limit(15)
    render json: @messages
  end

  private

  def permit_params
    params.require(:chat).permit([:body])
  end
end
