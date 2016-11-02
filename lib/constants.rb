module Constants
  DEFAULT_SYSTEM_ROLES = ['member', 'moderator', 'administrator']
  ADMIN_SYSTEM_ROLES = ['moderator', 'administrator']

  SAFE_PARAMS = {
    user: [:id, :username, :online, :location, :permissions],
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
