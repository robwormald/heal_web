# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.new({ username: 'GuskiS', email: 'edvards@lazdans.lv', password: 'qwerty123' })
user.skip_confirmation!
user.save!

chat_room = ChatRoom.create!({ title: 'General' })
chat_message = ChatMessage.create!({ chat_room_id: chat_room.id, user_id: user.id, body: 'Hey!' })
