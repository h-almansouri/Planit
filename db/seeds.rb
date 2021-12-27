puts "🌱 Seeding spices..."

puts 'Creating users...'
mike = User.create(name: "neisguy", birthday: DateTime.new(1997,4,15), profile_picture: "https://www.nicepng.com/png/detail/246-2469081_jake-adventure-time-and-jake-the-dog-image.png", bio: "bogos binted")
hisham = User.create(name: "velcruza", birthday: DateTime.new(1999,7,25), profile_picture: "https://www.nicepng.com/png/detail/246-2469081_jake-adventure-time-and-jake-the-dog-image.png", bio: "bogos binted")
joe = User.create(name: "goldennugget", birthday: DateTime.new(1996,7,10), profile_picture: "https://www.nicepng.com/png/detail/246-2469081_jake-adventure-time-and-jake-the-dog-image.png", bio: "bogos binted")
mitch = User.create(name: "chocolaterain", birthday: DateTime.new(1997,3,30), profile_picture: "https://www.nicepng.com/png/detail/246-2469081_jake-adventure-time-and-jake-the-dog-image.png", bio: "bogos binted")


puts 'Creating groups...'











puts "✅ Done seeding!"