class Reservation < ApplicationRecord
  belongs_to :cities
  belongs_to :user
  belongs_to :homes

  validates :start_date, presence: true
  validates :end_date, presence: true
end
