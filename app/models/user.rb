class User < ApplicationRecord
    has_secure_password
    has_many :personal_events, dependent: :delete_all
    has_many :messages
    has_many :joined_groups, dependent: :delete_all
    has_many :admin_groups, dependent: :delete_all
    has_many :group_messages, through: :messages, source: :group
    has_many :group_joins, through: :joined_groups, source: :group
    has_many :group_admins, through: :admin_groups, source: :group

    validates :username, presence: true
    # validates :password_confirmation, presence: true
end
