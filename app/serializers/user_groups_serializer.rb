class UserGroupsSerializer < ActiveModel::Serializer
    attributes :id, :username, :birthday, :profile_picture, :bio, :all_groups

    def all_groups
        all_groups =  object.group_admins + object.group_joins
    end
end
  