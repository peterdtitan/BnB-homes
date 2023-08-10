class Reservation < ApplicationRecord
  belongs_to :city, class_name: 'City'
  belongs_to :home
  belongs_to :user

  validates :start_date, presence: true
  validates :end_date, presence: true
end
