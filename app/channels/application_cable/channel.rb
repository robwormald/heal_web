module ApplicationCable
  class Channel < ActionCable::Channel::Base
    def sending_params(event, data)
      { event: event, data: data }
    end
  end
end
