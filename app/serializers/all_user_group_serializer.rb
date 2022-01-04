class AllUserGroupSerializer < ActiveModel::Serializer
  attributes :all_groups

  def all_groups
    all_groups =  object.group_admins + object.group_joins
    all_groups
  end
end
