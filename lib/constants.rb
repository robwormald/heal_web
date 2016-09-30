module Constants
  DEFAULT_SYSTEM_ROLES = ['member', 'moderator', 'administrator']
  ADMIN_SYSTEM_ROLES = ['moderator', 'administrator']

  SAFE_PARAMS = {
    user: [:id, :username, :online, :location]
  }
end
