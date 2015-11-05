class MessagesController < ApplicationController

  # GET /messages/new
  def new
    @message = Message.new
  end


  # POST /messages
  def create
    @message = Message.new(message_params)

    if @message.valid?
      MessageMailer.new_message(@message).deliver_now
      redirect_to contact_path, notice: "Your message has been sent."
    else
      flash.now[:alert] = "An error occured while delivering this message :/"
      render :new
    end
  end


  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def message_params
      params.require(:message).permit(:name, :email, :website, :comment)
    end
end
