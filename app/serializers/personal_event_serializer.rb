class PersonalEventSerializer < ActiveModel::Serializer
  attributes :id, :title, :start, :end, :all_day, :desc, :color
  has_one :user
end
