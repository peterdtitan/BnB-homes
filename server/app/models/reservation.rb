class Reservation < ApplicationRecord
  belongs_to :city, class_name: "City" 
  belongs_to :user
  belongs_to :home

  validates :start_date, presence: true
  validates :end_date, presence: true
end
