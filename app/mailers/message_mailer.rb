class MessageMailer < ApplicationMailer
    def new_message(message)
        @message = message
        mail subject: "ObsiRails : Message from #{message.name}"
        mail content_type: "text/html"
    end
end
