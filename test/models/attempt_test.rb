# frozen_string_literal: true

require "test_helper"

class AttemptTest < ActiveSupport::TestCase
  def setup
    admin_user = User.create(
      first_name: "Sam",
      last_name: "Smith",
      email: "sam@example.com",
      password: "welcome",
      password_confirmation: "welcome",
      role: "administrator"
    )
    quiz = admin_user.quizzes.create(name: "GK")
    standard_user = User.create(
      first_name: "Sam",
      last_name: "Smith",
      email: "sam@example.com",
      password: "welcome",
      password_confirmation: "welcome"
    )
    @attempt = standard_user.attempts.new(quiz_id: quiz.id)
  end

  def test_attempt_is_valid
    assert @attempt.valid?
  end

  def test_attempt_submitted_has_default_false
    assert_equal @attempt.submitted, false
  end

  def test_attempt_should_not_be_valid_without_quiz
    @attempt.quiz = nil
    assert @attempt.invalid?
  end
end
