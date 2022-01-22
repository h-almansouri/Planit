puts "🌱 Seeding spices..."

puts 'Creating users...'
mike = User.create(username: "neisguy", birthday: DateTime.new(1997,4,15), profile_picture: "https://www.nicepng.com/png/detail/246-2469081_jake-adventure-time-and-jake-the-dog-image.png", bio: "I'm a pretty neis guy", password: "planit", password_confirmation: "planit")
hisham = User.create(username: "velcruza", birthday: DateTime.new(1999,7,25), profile_picture: "https://www.nicepng.com/png/detail/246-2469081_jake-adventure-time-and-jake-the-dog-image.png", bio: "WoW legend", password: "planit", password_confirmation: "planit")
joe = User.create(username: "goldennugget", birthday: DateTime.new(1996,7,10), profile_picture: "https://www.nicepng.com/png/detail/246-2469081_jake-adventure-time-and-jake-the-dog-image.png", bio: "COD addict", password: "planit", password_confirmation: "planit")
mitch = User.create(username: "chocolaterain", birthday: DateTime.new(1997,3,30), profile_picture: "https://www.nicepng.com/png/detail/246-2469081_jake-adventure-time-and-jake-the-dog-image.png", bio: "daddy longlegs", password: "planit", password_confirmation: "planit")


puts 'Creating groups...'
apex = Group.create(name: "Apex Legends", group_picture: "https://media.contentapi.ea.com/content/dam/apex-legends/common/escape/apex-featured-image-escape-season.jpg.adapt.crop16x9.1023w.jpg")
league = Group.create(name: "League of Legends", group_picture: "https://pentagram-production.imgix.net/cc7fa9e7-bf44-4438-a132-6df2b9664660/EMO_LOL_02.jpg?rect=0%2C0%2C1440%2C1512&w=640&crop=1&fm=jpg&q=70&auto=format&fit=crop&h=672")
vball = Group.create(name: "Volleyball League", group_picture: "https://assets.nfhslearn.com/uploads/course/icon_image/9000/Coaching_Volleyball_2x.png")
wow = Group.create(name: "World of Warcraft", group_picture: "https://image.pngaaa.com/943/859943-middle.png")
climb = Group.create(name: "Climbing", group_picture: "https://www.roadaffair.com/wp-content/uploads/2019/06/rock-climbing-shoes-shutterstock_235573933.jpg")
wow3 = Group.create(name: "wow3", group_picture: "https://www.nicepng.com/png/detail/246-2469081_jake-adventure-time-and-jake-the-dog-image.png")
wow4 = Group.create(name: "wow4", group_picture: "https://www.nicepng.com/png/detail/246-2469081_jake-adventure-time-and-jake-the-dog-image.png")
wow5 = Group.create(name: "wow5", group_picture: "https://www.nicepng.com/png/detail/246-2469081_jake-adventure-time-and-jake-the-dog-image.png")
wow6 = Group.create(name: "wow6", group_picture: "https://www.nicepng.com/png/detail/246-2469081_jake-adventure-time-and-jake-the-dog-image.png")
wow7 = Group.create(name: "wow7", group_picture: "https://www.nicepng.com/png/detail/246-2469081_jake-adventure-time-and-jake-the-dog-image.png")


puts 'Creating admins...'
AdminGroup.create(user_id: mike.id, group_id: apex.id)
AdminGroup.create(user_id: joe.id, group_id: league.id)
AdminGroup.create(user_id: mitch.id, group_id: vball.id)
AdminGroup.create(user_id: mitch.id, group_id: climb.id)
AdminGroup.create(user_id: hisham.id, group_id: wow.id)

puts 'Creating joined groups...'
JoinedGroup.create(user_id: mitch.id, group_id: apex.id)
JoinedGroup.create(user_id: mike.id, group_id: league.id)
JoinedGroup.create(user_id: mike.id, group_id: vball.id)
JoinedGroup.create(user_id: hisham.id, group_id: apex.id)
JoinedGroup.create(user_id: joe.id, group_id: wow.id)
JoinedGroup.create(user_id: mike.id, group_id: wow.id)
JoinedGroup.create(user_id: mike.id, group_id: climb.id)
JoinedGroup.create(user_id: joe.id, group_id: climb.id)
JoinedGroup.create(user_id: hisham.id, group_id: climb.id)
JoinedGroup.create(user_id: mike.id, group_id: wow3.id)
JoinedGroup.create(user_id: mike.id, group_id: wow4.id)
JoinedGroup.create(user_id: mike.id, group_id: wow5.id)
JoinedGroup.create(user_id: mike.id, group_id: wow6.id)
JoinedGroup.create(user_id: mike.id, group_id: wow7.id)


puts 'Creating messages...'
Message.create(user_id: mitch.id, group_id: apex.id, message: "Fun game")
Message.create(user_id: mitch.id, group_id: vball.id, message: "Did we register our team yet?")
Message.create(user_id: mike.id, group_id: apex.id, message: "wraith sucks")
Message.create(user_id: mike.id, group_id: vball.id, message: "Yeah I did on Monday")
Message.create(user_id: hisham.id, group_id: wow.id, message: "I'll hard carry")
Message.create(user_id: joe.id, group_id: league.id, message: "I hate this game, it's nothing like cod")
Message.create(user_id: mike.id, group_id: climb.id, message: "Got new shoes lets gooooooo")
Message.create(user_id: mitch.id, group_id: climb.id, message: "Ayyy")

puts 'Creating personal events...'
PersonalEvent.create(user_id: mike.id, title: 'dentist appointment', start: DateTime.new(2022, 1, 4, 15), end: DateTime.new(2022, 1, 4, 16), all_day: false, desc: "This is a long time coming", color: "red")
PersonalEvent.create(user_id: mike.id, title: 'new years party', start: DateTime.new(2021, 12, 31, 20), end: DateTime.new(2022, 1, 1, 4), all_day: false, desc: "Happy new year", color: "blue")
PersonalEvent.create(user_id: hisham.id, title: 'haircut', start: DateTime.new(2021, 12, 29, 10), end: DateTime.new(2021, 12, 29, 15), all_day: false, desc: "Fresh cut", color: "green")

puts 'Creating group events...'
GroupEvent.create(group_id: apex.id, title: 'apex tourney', start: DateTime.new(2022, 1, 6, 20), end: DateTime.new(2022, 1, 6, 23), all_day: false, desc: "apex legends tournament", color: "red")
GroupEvent.create(group_id: vball.id, title: 'championship game', start: DateTime.new(2022, 1, 7, 12), end: DateTime.new(2022, 1, 7, 16), all_day: false, desc: "championship game", color: "yellow")
GroupEvent.create(group_id: wow.id, title: 'all day wow', start: DateTime.new(2022, 1, 12), all_day: true, desc: "wow grind all day", color: "yellow")





puts "✅ Done seeding!"