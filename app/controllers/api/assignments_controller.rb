class Api::AssignmentsController < ApplicationController
    before_action :set_assignment, only: [:show, :update, :destroy]
    before_action :set_template, only: [:show_template, :update_template, :destroy_template]
    respond_to :json

    def create
        authorize Assignment
        puts "Create has started"
        puts "take a look at the single assignmet params"
        puts single_assignment_params
        curr_participant = single_assignment_params.fetch(:participant_id)
        if  curr_participant.nil?
            render json: { error: 'Participant must be populated'}, status: :unprocessable_entity
            return
        end
        begin
            due_date = DateTime.parse(single_assignment_params.fetch(:due_date))
        rescue ArgumentError
            due_date = nil
        end
        puts "I will create the the action item now"
        action_item_params = {
            title:  single_assignment_params.fetch(:title),
            description: single_assignment_params.fetch(:description),
            due_date: due_date,
            category: single_assignment_params.fetch(:category),
            file: single_assignment_params.fetch(:file),
        }
        action_item = ActionItem.new(action_item_params.except(:due_date)) 
        puts action_item
        template_sentry_helper(action_item)
        action_item[:is_template] = false
        puts 'this should not be a template'
        puts action_item.is_template
        puts 'this is the id'
        puts action_item.id
        puts 'this is the action item category'
        if !curr_participant.nil? && action_item.save
            assignment = prepare_single_assignment(curr_participant, action_item, due_date)
            puts assignment.nil?
            puts assignment.participant_id
            # assignment_sentry_helper(assignment) 
            puts assignment.save
            if assignment.save
                puts "I AM SAVING"
                AssignmentMailer.with(assignment: assignment, action_item: action_item).new_assignment.deliver_now
            else 
                puts "will get festyored"
                action_item.destroy
                created_action_items.each {|item| item.destroy}
                Raven.capture_message("Could not create action item")
                render json: { error: 'Could not create action item' }, status: :unprocessable_entity
                return
            end
        else
            action_item.destroy
            Raven.capture_message("Could not create action item")
            render json: { error: 'Could not create action item' }, status: :unprocessable_entity
            return
        end
        render json: created_assignments, status: :created
    end 

    def show
        authorize @assignment 
        render json: @assignment, status: :ok
    end

    def update
        authorize @assignment
        action_item_copied = false
        action_item = @assignment.action_item

        if !action_item_params.empty? && action_item.assignments.length > 1
            action_item = action_item.dup
            action_item_copied = true
        end

        @assignment.assign_attributes(assignment_params)
        action_item.assign_attributes(action_item_params)
        if (action_item.valid? && @assignment.valid?) && (action_item.save && @assignment.save)
            if action_item_copied
                @assignment.update(action_item: action_item)
            end
            render json: @assignment, status: :ok
        else
            Raven.capture_message("Could not update action item")
            render json: { error: 'Could not update action item' }, status: :unprocessable_entity
        end
    end

    def destroy
        authorize @assignment
        action_item = @assignment.action_item
        if @assignment.destroy
            if action_item.assignments.empty?
                action_item.destroy
            end
            render json: {}, status: :ok
        else
            Raven.capture_message("Failed to delete action item")
            render json: { error: 'Failed to delete action item' }, status: :unprocessable_entity
        end
    end

    def create_template
        @template = authorize ActionItem.new(action_item_params), :create?
        template_sentry_helper(@template)
        @template[:is_template] = true

        if @template.save
            render json: @template, status: :created
        else
            Raven.capture_message("Could not create template")
            render json: { error: 'Could not create template' }, status: :unprocessable_entity
        end
    end

    def get_templates
        @action_items = authorize ActionItem.where(is_template: true), :show?
        render json: @action_items, status: :ok
    end

    def show_template
        authorize @template, :show?
        render json: @template, status: :ok
    end

    def update_template
        authorize @template, :update?
        if @template.update(action_item_params)
            render json: @template, status: :ok
        else
            Raven.capture_message("Could not update template")
            render json: { error: 'Could not update template' }, status: :unprocessable_entity
        end
    end

    def destroy_template
        authorize @template, :destroy?
        if @template.is_template && @template.destroy
            render json: @template, status: :ok
        else
            Raven.capture_message("Failed to delete action item template. Action item must be a template.")
            render json: { error: 'Failed to delete action item template. Action item must be a template.' }, status: :unprocessable_entity
        end
    end

    private
    
    def set_template
        @template = ActionItem.find(params[:id])
        template_sentry_helper(@template)
    rescue ActiveRecord::RecordNotFound => exception
        Raven.extra_context(action_item_id: params[:id])
        Raven.capture_exception(exception)
        render json: { error: 'Could not find Action Item Template' }, status: :not_found
    end

    def template_sentry_helper(action_item)
        Raven.extra_context(case_note: action_item.attributes)
    end

    def set_assignment
        @assignment = Assignment.find(params[:id])
        assignment_sentry_helper(@assignment)
    rescue ActiveRecord::RecordNotFound => exception
        Raven.extra_context(assignment_id: params[:id])
        Raven.capture_exception(exception)
        render json: { error: 'Could not find Action Item' }, status: :not_found
    end

    def assignment_sentry_helper(assignment)
        Raven.extra_context(assignment: assignment.attributes)
        Raven.extra_context(action_item: assignment.action_item.attributes)
        Raven.extra_context(staff: assignment.staff.user.attributes)
        Raven.extra_context(participant: assignment.participant.user.attributes)
    end
          
    def prepare_bulk_assignment(participant_ids, action_item, due_date)
        bulk_assignment_params = []
        single_assignment_params = {
                                    action_item_id: action_item.id,
                                    staff_id: current_user.staff.id,
                                    due_date: due_date,
                                    completed: false,
                                   }
        participant_ids.each do |id|
            assignment = Assignment.new(single_assignment_params.merge(participant_id: id))
            bulk_assignment_params.append(assignment)
        end
        return bulk_assignment_params
    end

    def prepare_single_assignment(participant_id, action_item, due_date)
        puts 'i am processing single assignment'
        single_assignment = {
            action_item_id: action_item.id,
            staff_id: current_user.staff.id,
            due_date: due_date,
            completed: false,
           }
        assignment = Assignment.new(single_assignment.merge(participant_id: participant_id))
        return assignment
        end

    def action_item_params
        action_item_param = params.require(:assignment).permit(:title,
                                                               :description,
                                                               :category, :file)
    end

    def single_assignment_params
        puts "I am processing the the single assignment parameters"
        one_assignment_params = params.permit(:title, :description, :due_date, :category, :file, :participant_id)
    end
    
    def assignment_params
        assignment_param = params.require(:assignment).permit(:action_item_id,
                                                               :due_date,
                                                               :completed)
        assignment_param.merge(staff_id: current_user.staff.id)
    end

end