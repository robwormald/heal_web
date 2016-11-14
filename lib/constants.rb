module Constants
  DEFAULT_SYSTEM_ROLES = ['member', 'moderator', 'administrator']
  ADMIN_SYSTEM_ROLES = ['moderator', 'administrator']
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i

  SAFE_PARAMS = {
    user: [:id, :username, :online, :location, :permissions, :avatar],
    user_view: [:residence, :birthday, :signature],
    user_view_self: [:email],
    rating: [:id, :vote, :created_at],
    comment: [:id, :body, :created_at]
  }

  GAME_SERVER_VARIABLES = [
    { dns: 'dd2.heal.lv', port: '27015' },
    { dns: 'dd2.keep.lv', port: '27015' },
    { dns: 'dc.keep.lv', port: '27015' },
    { dns: 'dc.keep.lv', port: '27016' },
    { ip: '37.203.34.27', port: '27016' },
  ]
end
