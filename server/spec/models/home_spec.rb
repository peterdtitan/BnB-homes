require 'rails_helper'

RSpec.describe Home, type: :model do
  # Test for associations
  it { should have_many(:reservations).dependent(:destroy) }

  # Test for validations
  it { should validate_presence_of(:name) }
  it { should validate_length_of(:name).is_at_least(3).is_at_most(20) }

  it { should validate_presence_of(:price) }
  it { should validate_numericality_of(:price).only_integer.is_greater_than_or_equal_to(0) }

  it { should validate_presence_of(:description) }
  it { should validate_length_of(:description).is_at_least(10) }

  it { should validate_presence_of(:image) }
end
