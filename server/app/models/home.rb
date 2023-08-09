class Home < ApplicationRecord
  has_many :reservations, dependent: :destroy


  validates :name, presence: true, length: { minimum: 3, maximum: 50 }
  validates :price, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :description, presence: true, length: { minimum: 10 }
  validates :image, presence: true
end
