class PagesController < ApplicationController
  def dashboard
    path =  case current_user.user_type
            when 'staff'
              @user = current_user
              @participants = Participant.all
              authorize Staff
              dashboard_staffs_path
            when 'participant'
              @user = current_user
              @paperworks = policy_scope @user.participant.paperworks
              @case_notes = policy_scope @user.participant.case_notes
              authorize Participant
              dashboard_participants_path
            else
              new_user_session_path
            end
    render path
  end
end