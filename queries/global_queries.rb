module GlobalQueries
  def self.permission_array
    'chat_rooms.permissions && ARRAY[?]::varchar[]'
  end
end
