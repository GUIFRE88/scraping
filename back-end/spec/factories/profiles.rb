FactoryBot.define do
  factory :profile do
    name { Faker::Name.name }
    link { Faker::Internet.url }
    followers { Faker::Number.number(digits: 3) }
    following { Faker::Number.number(digits: 3) }
    stars { Faker::Number.number(digits: 3) }
    contributions_last_year { Faker::Number.number(digits: 3) }
    profile_image { Faker::Avatar.image }
    organization { Faker::Company.name }
    location { Faker::Address.city }
    nick_name { Faker::Internet.username }
  end
end
