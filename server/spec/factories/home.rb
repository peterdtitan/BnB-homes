FactoryBot.define do
  factory :home do
    name { Faker::Lorem.words(number: 3).join(' ') }
    price { Faker::Number.within(range: 100..1000) }
    description { Faker::Lorem.paragraph(sentence_count: 2) }
    image { 'example.jpg' }
  end
end
