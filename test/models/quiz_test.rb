# frozen_string_literal: true

require "test_helper"

class QuizTest < ActiveSupport::TestCase
  def setup
    @user = User.create(
      first_name: "Sam",
      last_name: "Smith",
      email: "sam@example.com",
      password: "welcome",
      password_confirmation: "welcome"
    )
    @quiz = Quiz.new(
      name: "New Quiz",
      user_id: @user.id)
  end

  def test_quiz_valid
    assert @quiz.valid?
  end

  def test_quiz_should_not_be_valid_without_user
    @quiz.user_id = nil
    assert @quiz.invalid?
    assert_includes @quiz.errors.full_messages, "User must exist"
  end

  def test_quiz_title_should_of_valid_length
    @quiz.name = "a" * 51
    assert @quiz.invalid?
    assert_includes @quiz.errors.full_messages, "Name is too long (maximum is 50 characters)"
  end

  def test_quiz_should_have_title
    @quiz.name = ""
    assert @quiz.invalid?
    assert_includes @quiz.errors.full_messages, "Name can't be blank"
  end
end
