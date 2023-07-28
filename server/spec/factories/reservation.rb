FactoryBot.define do
    factory :reservation do
      association :city
      association :user
      association :home
      start_date { Date.today }
      end_date { Date.today + 7.days }
    end
  end
  