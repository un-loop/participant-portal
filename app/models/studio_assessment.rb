class StudioAssessment < ApplicationRecord
    belongs_to :staff
    belongs_to :participant
end
