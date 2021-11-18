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
    attempt = Attempt.find_by(id: params[:id])
    if attempt.update(update_attempt_params)
      render status: :ok, json: { notice: "Successfully updated Attempt" }
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
