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

  def export_report
    job_id = ExportReportWorker.perform_async
    if job_id
      render status: :ok, json: { jid: job_id }
    else
      render status: :unprocessable_entity, json: { error: "Coudnt process Job" }
    end
  end

  def export_status
    respond_to do |format|
      format.json do
        job_id = params[:job_id]

        job_status = Sidekiq::Status::pct_complete job_id

        render json: {
          percentage: job_status
        }
      end
    end
  end

  def export_download
    job_id = params[:job_id]
    exported_file_name = "report_export_#{job_id}.xlsx"
    send_file Rails.root.join("tmp", exported_file_name), type: :xlsx
  end

  private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end
end
