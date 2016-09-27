# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

main_user = User.new({ username: 'GuskiS', email: 'edvards@lazdans.lv', password: 'qwerty123' })
main_user.skip_confirmation!
main_user.save!

test_user = User.new({ username: 'test', email: 'test@test.lv', password: 'qwerty123' })
test_user.skip_confirmation!
test_user.save!

ChatRoom.create!({ title: 'General' })
ChatRoom.create!({ title: 'Gaming' })
ChatRoom.create!({ title: 'Admin' })
