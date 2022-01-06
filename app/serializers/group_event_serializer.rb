class GroupEventSerializer < ActiveModel::Serializer
  attributes :id, :title, :start, :end, :all_day, :desc, :color, :group_id
  # has_one :group
end
