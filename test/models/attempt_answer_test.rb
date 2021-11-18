# frozen_string_literal: true

require "test_helper"

class AttemptAnswerTest < ActiveSupport::TestCase
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
    question = quiz.questions.create(
      content: "Question",
      options_attributes: [{ content: "O1", answer: true }, { content: "O2", answer: false }])
    option1 = question.options.first
    option2 = question.options.last
    standard_user = User.create(
      first_name: "Sam",
      last_name: "Smith",
      email: "sam@example.com",
      password: "welcome",
      password_confirmation: "welcome"
    )
    attempt = standard_user.attempts.new(quiz_id: quiz.id)
    @attempt_answer = attempt.attempt_answers.new(option_id: option1.id, question_id: question.id)
  end

  def test_attempt_answer_is_valid
    assert @attempt_answer.valid?
  end

  def test_attempt_answer_should_not_be_valid_without_question
    @attempt_answer.question = nil
    assert @attempt_answer.invalid?
  end

  def test_attempt_answer_should_not_be_valid_without_attempt
    @attempt_answer.attempt = nil
    assert @attempt_answer.invalid?
  end

  def test_attempt_answer_should_not_be_valid_without_option
    @attempt_answer.option = nil
    assert @attempt_answer.invalid?
  end
end
