# frozen_string_literal: true

json.quiz do
  json.extract! @quiz, :name
  json.questions @quiz.questions do |question|
    json.extract! question, :content, :id
    json.options question.options do |option|
      json.extract! option, :content, :answer, :id
    end
  end
end
