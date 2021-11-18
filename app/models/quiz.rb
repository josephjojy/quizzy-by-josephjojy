# frozen_string_literal: true

class Quiz < ApplicationRecord
  belongs_to :user

  has_many :questions, dependent: :destroy
  has_many :attempts

  validates :name, presence: true, length: { maximum: 50 }
  validates :user_id, presence: true
  validates :slug, uniqueness: { allow_nil: true }
end
