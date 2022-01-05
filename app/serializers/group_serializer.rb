class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :group_picture, :all_users
  def all_users
    new_array = object.admin_users + object.joined_users
  end
end
