# frozen_string_literal: true

class UsersController < ApplicationController
  def create
    @user = User.find_by(email: user_params[:email])
    unless @user
      @user = User.new(user_params)
      unless @user.save
        render status: :unprocessable_entity, json: { error: @user.errors.full_messages.to_sentence }
      end
    end
  end

  private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end
end
