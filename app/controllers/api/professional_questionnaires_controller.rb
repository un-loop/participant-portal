class Api::ProfessionalQuestionnairesController < ApplicationController
    before_action :set_questionnaire, only: [:show, :update, :destroy]
    respond_to :json
  
    def show
      render json: @questionnaire
    end
  
    def create
      @questionnaire = ProfessionalQuestionnaire.new(questionnaire_params)
      puts @questionnaire.resume
      puts @questionnaire.education_history
      authorize @questionnaire, policy_class: QuestionnairePolicy
      sentry_helper(@questionnaire)
      if @questionnaire.save
        render json: @questionnaire, status: :created
      else
        Raven.capture_message("Could not create professional questionnaire")
        render json: { error: 'Could not create professional questionnaire' }
      end
    end
  
    def update
      authorize @questionnaire, policy_class: QuestionnairePolicy
      puts "I am updating a pro ques"
      puts "this is the params"
      puts questionnaire_params
      puts "this is the questionare"
      puts @questionnaire
      puts questionnaire_params.fetch(:resume).present?
      puts questionnaire_params.fetch(:resume)
      puts questionnaire_params.fetch(:resume).eql?("null")
      if !questionnaire_params.nil? && questionnaire_params.fetch(:resume).present? && !(questionnaire_params.fetch(:resume).eql?("null"))
        if @questionnaire.resume.attached?
          @questionnaire.resume.purge
        end
        @questionnaire.resume.attach(questionnaire_params.fetch(:resume))
      end
      
      if @questionnaire.update!(questionnaire_params.except(:resume))
        render json: @questionnaire, status: :ok
      else
        Raven.capture_message("Could not update professional questionnaire")
        render json: { error: 'Could not update professional questionnaire' }, status: :unprocessable_entity
      end
      puts "WHERE THE FUCK AM I"
      puts @questionnaire.resume
      puts @questionnaire.education_history
    end
  
    def destroy
      authorize @questionnaire, policy_class: QuestionnairePolicy
      if @questionnaire.destroy
        render json: @questionnaire, status: :ok
      else
        Raven.capture_message("Failed to delete professional questionnaire")
        render json: { error: 'Failed to delete professional questionnaire' }, status: :unprocessable_entity
      end
    end
  
    private
    def set_questionnaire
      @questionnaire = authorize ProfessionalQuestionnaire.find(params[:id]), policy_class: QuestionnairePolicy
    rescue ActiveRecord::RecordNotFound => exception
      Raven.extra_context(professional_questionnaire_id: params[:id])
      Raven.capture_exception(exception)
      render json: { error: 'Could not find professional questionnaire' }, status: :not_found
    end

    def sentry_helper(professional_questionnaire)
      Raven.extra_context(professional_questionnaire: professional_questionnaire.attributes)
      Raven.extra_context(participant: professional_questionnaire.participant.user.attributes)
    end
  
    # may not work
    def questionnaire_params
      questionnaire_params = params.require(:professional_questionnaire).permit(:participant_id, :course_completion,
        :work_history, :job_search_materials, :professional_goals, 
        :barriers, :education_history, :begin_skills_assessment_date, :end_skills_assessment_date,
        :assigned_mentor, :success_strategies, :resume)
    end
  
  end
  