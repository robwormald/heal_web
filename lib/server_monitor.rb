module ServerMonitor
  def self.query
    redis = Redis.new
    servers = self.get_servers_data
    data = servers.to_json
    redis.set('server_monitor', data)
    data
  end

  private

  def self.get_servers_data
    servers = Constants::GAME_SERVER_VARIABLES.map do |variable|
      server_ip = IPAddr.new(get_ip(variable))
      server = GoldSrcServer.new(server_ip, variable[:port])
      server.init

      self.map_server_data(server, variable)
    end

    self.sort(servers, :current_count)
  end

  def self.map_server_data(server, variable)
    info_hash = server.server_info
    {
      ip: variable[:dns] || variable[:ip],
      map: info_hash[:map_name],
      name: info_hash[:server_name],
      port: info_hash[:server_port],
      current_count: info_hash[:number_of_players] + info_hash[:number_of_bots],
      total_count: info_hash[:max_players],
      players: map_player_data(server.players)
    }
  end

  def self.map_player_data(hash)
    players = hash.map do |_key, player|
      { name: player.name, score: player.score }
    end
    self.sort(players, :score)
  end

  def self.get_ip(variable)
    return variable[:ip] if variable[:ip]
    return Resolv.getaddress(variable[:dns]) if variable[:dns]
  end

  def self.sort(array, key)
    array.sort { |a, b| a[key] <=> b[key] }.reverse
  end
end
