puts "🌱 Seeding spices..."

puts 'Creating users...'
mike = User.create(username: "neisguy", birthday: DateTime.new(1997,4,15), profile_picture: "https://www.nicepng.com/png/detail/246-2469081_jake-adventure-time-and-jake-the-dog-image.png", bio: "bogos binted", password: "planit", password_confirmation: "planit")
hisham = User.create(username: "velcruza", birthday: DateTime.new(1999,7,25), profile_picture: "https://www.nicepng.com/png/detail/246-2469081_jake-adventure-time-and-jake-the-dog-image.png", bio: "bogos binted", password: "planit", password_confirmation: "planit")
joe = User.create(username: "goldennugget", birthday: DateTime.new(1996,7,10), profile_picture: "https://www.nicepng.com/png/detail/246-2469081_jake-adventure-time-and-jake-the-dog-image.png", bio: "bogos binted", password: "planit", password_confirmation: "planit")
mitch = User.create(username: "chocolaterain", birthday: DateTime.new(1997,3,30), profile_picture: "https://www.nicepng.com/png/detail/246-2469081_jake-adventure-time-and-jake-the-dog-image.png", bio: "bogos binted", password: "planit", password_confirmation: "planit")


puts 'Creating groups...'
apex = Group.create(name: "Apex Legends", group_picture: "https://www.nicepng.com/png/detail/246-2469081_jake-adventure-time-and-jake-the-dog-image.png")
league = Group.create(name: "League of Legends", group_picture: "https://www.nicepng.com/png/detail/246-2469081_jake-adventure-time-and-jake-the-dog-image.png")
vball = Group.create(name: "Volleyball League", group_picture: "https://www.nicepng.com/png/detail/246-2469081_jake-adventure-time-and-jake-the-dog-image.png")
wow = Group.create(name: "World of Warcraft", group_picture: "https://www.nicepng.com/png/detail/246-2469081_jake-adventure-time-and-jake-the-dog-image.png")


puts 'Creating admins...'
AdminGroup.create(user_id: mike.id, group_id: apex.id)
AdminGroup.create(user_id: joe.id, group_id: league.id)
AdminGroup.create(user_id: mitch.id, group_id: vball.id)
AdminGroup.create(user_id: hisham.id, group_id: wow.id)

puts 'Creating joined groups...'
JoinedGroup.create(user_id: mitch.id, group_id: apex.id)
JoinedGroup.create(user_id: mike.id, group_id: league.id)
JoinedGroup.create(user_id: mike.id, group_id: vball.id)
JoinedGroup.create(user_id: hisham.id, group_id: apex.id)
JoinedGroup.create(user_id: joe.id, group_id: wow.id)
JoinedGroup.create(user_id: mike.id, group_id: wow.id)

puts 'Creating messages...'
Message.create(user_id: mitch.id, group_id: apex.id, message: "Fun game")
Message.create(user_id: mitch.id, group_id: vball.id, message: "Bump set spike")
Message.create(user_id: mike.id, group_id: apex.id, message: "wraith sucks")
Message.create(user_id: mike.id, group_id: vball.id, message: "What time is the game")
Message.create(user_id: hisham.id, group_id: wow.id, message: "I'll hard carry")
Message.create(user_id: joe.id, group_id: league.id, message: "I hate this game, it's nothing like cod")

puts 'Creating personal events...'
PersonalEvent.create(user_id: mike.id, title: 'dentist appointment', start: DateTime.new(2022, 1, 4, 15), end: DateTime.new(2022, 1, 4, 16), all_day: false, desc: "This is a long time coming", color: "red")
PersonalEvent.create(user_id: mike.id, title: 'new years party', start: DateTime.new(2021, 12, 31, 20), end: DateTime.new(2022, 1, 1, 4), all_day: false, desc: "Happy new year", color: "blue")
PersonalEvent.create(user_id: hisham.id, title: 'haircut', start: DateTime.new(2021, 12, 29, 10), end: DateTime.new(2021, 12, 29, 15), all_day: false, desc: "Fresh cut", color: "green")

puts 'Creating group events...'
GroupEvent.create(group_id: apex.id, title: 'apex tourney', start: DateTime.new(2022, 1, 6, 20), end: DateTime.new(2022, 1, 6, 23), all_day: false, desc: "apex legends tournament", color: "red")
GroupEvent.create(group_id: vball.id, title: 'championship game', start: DateTime.new(2022, 1, 7, 12), end: DateTime.new(2022, 1, 7, 16), all_day: false, desc: "championship game", color: "yellow")
GroupEvent.create(group_id: wow.id, title: 'all day wow', start: DateTime.new(2022, 1, 12), all_day: true, desc: "wow grind all day", color: "yellow")





puts "✅ Done seeding!"