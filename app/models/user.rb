class User < ActiveRecord::Base
  belongs_to :role
  has_many :news
  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable, :registerable,
  devise :database_authenticatable, :recoverable, :rememberable, :trackable, :validatable
end
