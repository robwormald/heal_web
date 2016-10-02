# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

main_user = User.new({ username: 'GuskiS', email: 'edvards@lazdans.lv', password: 'qwerty123', permissions: [:member, :administrator] })
main_user.skip_confirmation!
main_user.save!

test_user = User.new({ username: 'test', email: 'test@test.lv', password: 'qwerty123' })
test_user.skip_confirmation!
test_user.save!

ChatRoom.create!({ title: '#general' })
ChatRoom.create!({ title: '#gaming' })
ChatRoom.create!({ title: '#admin', permissions: Constants::ADMIN_SYSTEM_ROLES })

poll_1 = Poll.create!(title: "Is it first?")
poll_1_answer_1 = PollQuestion.create!(poll: poll_1, question: 'Yup')
poll_1_answer_2 = PollQuestion.create!(poll: poll_1, question: 'Nope')

poll_2 = Poll.create!(title: "What`s up?")
poll_2_answer_1 = PollQuestion.create!(poll: poll_2, question: 'Everitin')
poll_2_answer_2 = PollQuestion.create!(poll: poll_2, question: 'Not mach')
poll_2_answer_3 = PollQuestion.create!(poll: poll_2, question: 'Nasing')
