# spec/models/user_spec.rb
require 'rails_helper'

RSpec.describe User, type: :model do
  subject(:user) { FactoryBot.build(:user) }

  describe 'validations' do
    it { should be_valid }

    it { should validate_presence_of(:name) }
    it { should validate_length_of(:name).is_at_least(8) }

    it { should validate_presence_of(:password) }
    it { should validate_length_of(:password).is_at_least(8) }
  end
end
