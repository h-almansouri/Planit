class JoinedGroup < ApplicationRecord
  belongs_to :user_id
  belongs_to :group_id
end
