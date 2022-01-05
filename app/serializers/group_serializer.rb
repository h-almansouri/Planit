class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :group_picture, :admin_users, :joined_users
end
