class Api::ChatController < ApiController
  def index
    @chat_rooms = ChatRoom.where(GlobalQueries.permission_array, current_user.permissions)
    @chat_messages = get_messages(@chat_rooms.first.id)
    render json: { chats: @chat_rooms, messages: @chat_messages.as_json(include: { user: { only: Constants::SAFE_PARAMS[:user] } }) }
  end

  def create
    chat_room = ChatRoom.where(id: params[:id]).where(GlobalQueries.permission_array, current_user.permissions).first
    if chat_room
      message = ChatMessage.new(permit_params)
      message.user = current_user
      message.chat_room = chat_room
      if message.save
        ChatMessageJob.perform_later(message)
        return head :ok
      else
        ChannelHelpers.notification(current_user.id, 'danger', 'Error', message.errors.full_messages.join(", "))
      end
    end

    head :bad_request
  end

  def show
    @chat_room = ChatRoom.where(id: params[:id]).where(GlobalQueries.permission_array, current_user.permissions).first
    if(@chat_room)
      @chat_messages = get_messages(@chat_room.id)
      render json: @chat_messages
    else
      render json: []
    end
  end

  private

  def get_messages(chat_room_id)
    ChatMessage.where({ chat_room_id: chat_room_id }).includes(:user).order(id: :desc).limit(15)
  end

  def permit_params
    params.require(:chat).permit([:body])
  end
end
