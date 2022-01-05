class PersonalEvent < ApplicationRecord
  belongs_to :user

  validates :user_id, :title, :start, :end, presence: true
end
