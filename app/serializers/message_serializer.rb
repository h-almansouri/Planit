class MessageSerializer < ActiveModel::Serializer
  attributes :id, :message
  has_one :user
  has_one :group
end
