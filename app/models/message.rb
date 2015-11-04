class Message
    
    include ActiveModel::Model
    include ActiveModel::Conversion
    include ActiveModel::Validations
    
    attr_accessor :name, :email, :website, :comment
    
    validates :name, :email, :comment, presence: true
    
end
