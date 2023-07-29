# spec/models/reservation_spec.rb
require 'rails_helper'

RSpec.describe Reservation, type: :model do
  subject(:reservation) { FactoryBot.build(:reservation) }

  describe "validations" do
    it { should be_valid }

    it { should validate_presence_of(:start_date) }
    it { should validate_presence_of(:end_date) }
  end

  describe "associations" do
    it { should belong_to(:city).class_name("City") }
    it { should belong_to(:user) }
    it { should belong_to(:home) }
  end
end