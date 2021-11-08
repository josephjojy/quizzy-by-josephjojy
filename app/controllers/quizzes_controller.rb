# frozen_string_literal: true

class QuizzesController < ApplicationController
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index
  before_action :authenticate_user_using_x_auth_token

  def index
    @quizzes = policy_scope(Quiz)
  end

  def create
    quiz = @current_user.quizzes.new(quiz_params)
    authorize quiz
    if quiz.save
      render status: :ok, json: { notice: "Successfully created Quiz" }
    else
      errors = quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def destroy
    quiz = Quiz.find_by(id: params[:id])
    authorize quiz
    if quiz.destroy
      render status: :ok, json: { notice: "Successfully deleted Quiz" }
    else
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def update
    quiz = Quiz.find_by(id: params[:id])
    authorize quiz
    if quiz.update(name: quiz_params[:name])
      render status: :ok, json: { notice: "Successfully updated Quiz" }
    else
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def show
    quiz = Quiz.find_by(id: params[:id])
    authorize quiz
    render status: :ok, json: { quiz: quiz }
  end

  private

    def quiz_params
      params.require(:quiz).permit(:name)
    end
end
