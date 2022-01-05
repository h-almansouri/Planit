class GroupEvent < ApplicationRecord
  belongs_to :group

  validates :group_id, :title, :start, :end, presence: true
end
