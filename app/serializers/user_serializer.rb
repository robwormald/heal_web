class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :username, :created_at
end
