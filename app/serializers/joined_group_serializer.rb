class JoinedGroupSerializer < ActiveModel::Serializer
  attributes :id
  has_one :user_id
  has_one :group_id
end
