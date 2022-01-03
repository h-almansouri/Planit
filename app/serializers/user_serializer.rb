class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :birthday, :profile_picture, :bio
end
