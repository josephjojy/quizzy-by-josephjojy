# frozen_string_literal: true

json.attempt do
  json.extract! @attempt, :id, :submitted
end
