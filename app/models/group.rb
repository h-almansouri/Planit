class Group < ApplicationRecord
    has_many :group_events
    has_many :messages
    has_many :joined_groups
    has_many :admin_groups
    has_many :admin_users, through: :admin_groups, source: :user
    has_many :joined_users, through: :joined_groups, source: :user
    has_many :message_users, through: :messages, source: :user
end
