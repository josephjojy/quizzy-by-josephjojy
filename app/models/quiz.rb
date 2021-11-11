# frozen_string_literal: true

class Quiz < ApplicationRecord
  belongs_to :user

  has_many :questions

  validates :name, presence: true, length: { maximum: 50 }
  validates :user_id, presence: true
end
