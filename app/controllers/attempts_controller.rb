# frozen_string_literal: true

class AttemptsController < ApplicationController
  def create
    @attempt = Attempt.find_by(user_id: attempt_params[:user_id], quiz_id: attempt_params[:quiz_id])
    if @attempt
      unless @attempt.submitted == false
        render status: :found, json: { error: "User has already attempted" }
      end
    else
      @attempt = Attempt.new(attempt_params)
      unless @attempt.save
        render status: :unprocessable_entity, json: { error: @attempt.errors.full_messages.to_sentence }
      end
    end
  end

  def update
    @correct = 0
    @incorrect = 0
    attempt = Attempt.find_by(id: params[:id])
    if attempt.update(update_attempt_params)
      update_attempt_params[:attempt_answers_attributes].each do |option|
        currentOption = Option.find_by_id(option[:option_id])
        if currentOption.answer
          @correct += 1
        end
      end
      quiz = Quiz.find_by_id(update_attempt_params[:quiz_id])
      @incorrect = quiz.questions.size - @correct
      attempt.update(correct_answers_count: @correct, incorrect_answers_count: @incorrect)
    else
      render status: :unprocessable_entity, json: { error: attempt.errors.full_messages.to_sentence }
    end
  end

  def show
    @attempt = Attempt.find_by(id: params[:id])
  end

  private

    def attempt_params
      params.require(:attempt).permit(:user_id, :quiz_id, :submitted)
    end

    def update_attempt_params
      params.require(:attempt).permit(
        :user_id, :quiz_id, :submitted,
        attempt_answers_attributes: [:question_id, :option_id])
    end
end
