class AllUserGroupSerializer < ActiveModel::Serializer
  attributes :all_groups

  def all_groups
    all_groups =  object.group_admins + object.group_joins
    sorted_groups = all_groups.each_slice(8).to_a
    sorted_groups
  end
end
