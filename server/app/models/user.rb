class User < ApplicationRecord

  has_many :reservations

  validates :username, presence: true, length: { minimum: 8}
  validates :password, presence: true, length: { minimum: 8 }
end
