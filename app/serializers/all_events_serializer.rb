class AllEventsSerializer < ActiveModel::Serializer
  attributes :all_events

  def all_events
      group_events = []
      object.group_joins.each{|g| g.group_events.each{|e| group_events << e}}
      object.group_admins.each{|g| g.group_events.each{|e| group_events << e}}


      all_events = {
        group: group_events,
        personal: object.personal_events
      }
      all_events
  end
end
