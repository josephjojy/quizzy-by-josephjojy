# frozen_string_literal: true

class ExportReportWorker
  include Sidekiq::Worker
  include Sidekiq::Status::Worker

  def perform
    sleep 5
    quizzes = Quiz.order("created_at DESC")
    quizList = quizzes.includes(:attempts, attempts: [:user])
    @report = []
    quizList.each do |quiz|
      quiz.attempts.each do |attempt|
         if attempt.submitted
           full_name = attempt.user.first_name + " " + attempt.user.last_name
           @report << [
              quiz.name, full_name, attempt.user.email,
              attempt.correct_answers_count, attempt.incorrect_answers_count
           ]
         end
       end
    end
    puts @report

    xlsx_package = Axlsx::Package.new
    xlsx_workbook = xlsx_package.workbook

    xlsx_workbook.add_worksheet(name: "Report") do |worksheet|
      worksheet.add_row %w(Title Full_Name Email Correct_count Incorect_count)

      @report.each.with_index(1) do |report|
        worksheet.add_row report
        sleep 0.5
      end
    end

    xlsx_package.serialize Rails.root.join("tmp", "report_export_#{self.jid}.xlsx")
    at 100
  end
end
