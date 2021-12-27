class MessageSerializer < ActiveModel::Serializer
  attributes :id, :message
  has_one :user_id
  has_one :group_id
end
