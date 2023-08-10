class User < ApplicationRecord

  has_many :reservations

  validates :name, presence: true, length: { minimum: 8}
  validates :password, presence: true, length: { minimum: 8 }
end
