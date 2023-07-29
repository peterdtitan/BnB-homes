# spec/models/city_spec.rb

require 'rails_helper'

RSpec.describe City, type: :model do
  # Test for the associations
  it { should have_many(:reservations) }

  # Test for the validations
  it { should validate_presence_of(:name) }
  it { should validate_length_of(:name).is_at_least(3).is_at_most(50) }
end
