class Api::ChatController < ApiController
  def index
    @chat_rooms = ChatRoom.where(GlobalQueries.permission_array, current_user.permissions)
    render json: @chat_rooms
  end

  def create
    chat_room = ChatRoom.where(id: params[:id]).where(GlobalQueries.permission_array, current_user.permissions).first
    if chat_room
      message = ChatMessage.new(permit_params)
      message.user = current_user
      message.chat_room = chat_room
      message.save
      ChatMessageJob.perform_later(message)
    end
    render json: :ok
  end

  def show
    @messages = ChatMessage.joins(:chat_room)
      .where({ chat_room_id: params[:id] })
      .where(GlobalQueries.permission_array, current_user.permissions)
      .includes(:user).order(id: :desc).limit(15)
    render json: @messages
  end

  private

  def permit_params
    params.require(:chat).permit([:body])
  end
end
