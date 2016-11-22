class Api::ChatController < ApiController
  def index
    @chats = ChatRoom.where(GlobalQueries.permission_array, current_user.permissions)
    @messages = get_messages(@chats.first.id)
    @chats = @chats.map { |chat| { chat.title => chat.id } }.reduce({}, :merge)

    render json: { chats: @chats, messages: @messages }
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
        ChannelHelpers.error_notification(current_user.id, message.errors.full_messages.join(", "))
      end
    end

    head :bad_request
  end

  def show
    chat = ChatRoom.where(id: params[:id]).where(GlobalQueries.permission_array, current_user.permissions).first

    if(chat)
      render json: { messages: get_messages(chat.id) }
    else
      render json: { messages: [] }
    end
  end

  private

  def get_messages(chat_room_id)
    ChatMessage.where({ chat_room_id: chat_room_id }).includes(:user).order(id: :desc).limit(15)
      .as_json(include: { user: { only: Constants::SAFE_PARAMS[:user] } })
  end

  def permit_params
    params.require(:chat).permit([:body])
  end
end
