# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz

  has_many :options

  validates :content, presence: true
  validates :quiz_id, presence: true

  accepts_nested_attributes_for :options
end
