class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :password, :birthday, :profile_picture, :bio
end
