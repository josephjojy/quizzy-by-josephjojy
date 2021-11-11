# frozen_string_literal: true

class Option < ApplicationRecord
  belongs_to :question

  validates :content, presence: true
  validates :answer, presence: true
  validates :question_id, presence: true
end
