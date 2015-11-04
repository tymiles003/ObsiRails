class ApplicationMailer < ActionMailer::Base
  default from: "noreply@obsirails.eq4"
  default to: "Bidouilleur Numerique <contact@bidouilleur-numerique.com>"
  layout 'mailer'
end
