class User < ApplicationRecord
  validates :email, :first_name, :last_name, presence: true
  validates :first_name, :last_name, length: { maximum: 50 }
  validates :email, uniqueness: true
end
