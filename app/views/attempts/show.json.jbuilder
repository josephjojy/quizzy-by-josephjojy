# frozen_string_literal: true

json.attempt do
  json.extract! @attempt, :id, :quiz_id
  json.attempt_answers @attempt.attempt_answers do |attempt_answer|
    json.extract! attempt_answer, :question_id, :option_id
  end
end
