# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quiz, only: [:create]

  def create
    question = @quiz.questions.new(ques_params)
    if question.save
      render status: :ok, json: { notice: "Successfully created Question" }
    else
      errors = question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  private

    def load_quiz
      @quiz = Quiz.find_by(id: ques_params[:quiz_id])
      unless @quiz
        render status: :not_found, json: { error: "Quiz not found" }
      end
    end

    def ques_params
      params.require(:question).permit(:content, :quiz_id, options_attributes: [:content, :answer])
    end
end
