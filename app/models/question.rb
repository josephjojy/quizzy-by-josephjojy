# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz

  validates :content, presence: true
  validates :quiz_id, presence: true
end
