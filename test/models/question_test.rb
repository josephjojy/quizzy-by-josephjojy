# frozen_string_literal: true

require "test_helper"

class QuestionTest < ActiveSupport::TestCase
  def setup
    @user = User.create(
      first_name: "Sam",
      last_name: "Smith",
      email: "sam@example.com",
      password: "welcome",
      password_confirmation: "welcome"
    )
    @quiz = Quiz.create(
      name: "New Quiz",
      user_id: @user.id
    )
    @question = Question.new(
      content: "Some Question",
      quiz_id: @quiz.id
    )
  end

  def test_question_valid
    assert @question.valid?
  end

  def test_question_should_not_be_valid_without_quiz
    @question.quiz_id = nil
    assert @question.invalid?
    assert_includes @question.errors.full_messages, "Quiz must exist"
  end

  def test_question_should_have_content
    @question.content = ""
    assert @question.invalid?
    assert_includes @question.errors.full_messages, "Content can't be blank"
  end
end
