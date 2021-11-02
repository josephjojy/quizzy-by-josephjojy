# frozen_string_literal: true

class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze

  validates :email, :first_name, :last_name, presence: true
  validates :first_name, :last_name, length: { maximum: 50 }
  validates :email, uniqueness: true, format: { with: VALID_EMAIL_REGEX }
end
