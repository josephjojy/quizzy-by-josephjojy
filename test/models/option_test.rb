# frozen_string_literal: true

require "test_helper"

class OptionTest < ActiveSupport::TestCase
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
    @question = Question.create(
      content: "Some Question",
      quiz_id: @quiz.id
    )
    @option = Option.new(
      content: "Answer A",
      question_id: @question.id
    )
  end

  def test_option_valid
    assert @option.valid?
  end

  def test_option_should_have_content
    @option.content = ""
    assert @option.invalid?
    assert_includes @option.errors.full_messages, "Content can't be blank"
  end
end
