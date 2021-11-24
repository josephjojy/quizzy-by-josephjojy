# frozen_string_literal: true

class QuizzesController < ApplicationController
  after_action :verify_authorized, except: [:index, :show_slug, :show_answer]
  after_action :verify_policy_scoped, only: :index
  before_action :authenticate_user_using_x_auth_token, except: [:show_slug, :show_answer]

  def index
    @quizzes = policy_scope(Quiz).order("created_at DESC")
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
    quiz = @current_user.quizzes.find_by(id: params[:id])
    authorize quiz
    if quiz.destroy
      render status: :ok, json: { notice: "Successfully deleted Quiz" }
    else
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def update
    quiz = @current_user.quizzes.find_by(id: params[:id])
    authorize quiz
    if quiz.update(name: quiz_params[:name])
      render status: :ok, json: { notice: "Successfully updated Quiz" }
    else
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def show
    @quiz = @current_user.quizzes.find_by(id: params[:id])
    authorize @quiz
  end

  def set_slug
    @quiz = @current_user.quizzes.find_by(id: params[:id])
    authorize @quiz
    name_slug = @quiz.name.parameterize
    regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
    latest_quiz_slug = Quiz.where(
      regex_pattern,
      "#{name_slug}$|#{name_slug}-[0-9]+$"
      ).order(slug: :desc).first&.slug
    slug_count = 0
    if latest_quiz_slug.present?
      slug_count = latest_quiz_slug.split("-").last.to_i
      only_one_slug_exists = slug_count == 0
      slug_count = 1 if only_one_slug_exists
    end
    slug = slug_count.positive? ? "#{name_slug}-#{slug_count + 1}" : name_slug
    unless @quiz.update(slug: slug)
      render status: :not_found, json: { error: errors }
    end
  end

  def show_slug
    @quiz = Quiz.find_by(slug: params[:slug])
    unless @quiz
      render status: :not_found, json: { error: "Cannot find Quiz" }
    end
    if params[:userId] == "undefined" && @quiz
      render status: :ok, json: { name: @quiz.name, id: @quiz.id }
    end
  end

  def show_answer
    @quiz = Quiz.find_by(slug: params[:slug])
  end

  def generate_report
    quizzes = @current_user.quizzes.order("created_at DESC")
    authorize quizzes
    quizList = quizzes.includes(:attempts, attempts: [:user])
    @report = []
    quizList.each do |quiz|
      quiz.attempts.each do |attempt|
         if attempt.submitted
           full_name = attempt.user.first_name + " " + attempt.user.last_name
           @report << {
             title: quiz.name, full_name: full_name, email: attempt.user.email,
             correct_count: attempt.correct_answers_count, incorrect_count: attempt.incorrect_answers_count
           }
         end
       end
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:name)
    end
end
