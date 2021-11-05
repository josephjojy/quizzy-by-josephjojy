# frozen_string_literal: true

class QuizzesController < ApplicationController
  def index
    @quiz = Quiz.all
  end

  def create
    quiz = Quiz.new(quiz_params)
    if quiz.save
      render status: :ok, json: { notice: "Successfully created Quiz" }
    else
      errors = quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:name, :user_id)
    end
end
