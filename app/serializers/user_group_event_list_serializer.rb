class UserGroupEventListSerializer < ActiveModel::Serializer
  attributes :list_group_events

  def list_group_events
      joined_events = []
      object.group_joins.each{|g| g.group_events.each{|e| joined_events << e}}

      admin_events = []
      object.group_admins.each{|g| g.group_events.each{|e| joined_events << e}}

      all_events = joined_events + admin_events
      all_events
  end
end
