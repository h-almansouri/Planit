class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :birthday, :profile_picture, :bio
end
