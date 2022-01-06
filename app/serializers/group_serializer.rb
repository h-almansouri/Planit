class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :group_picture, :all_users, :user_bool
  def all_users
    new_array = object.admin_users + object.joined_users
  end

  def user_bool
    object.admin_users.include?(current_user) || object.joined_users.include?(current_user)
  end
end
