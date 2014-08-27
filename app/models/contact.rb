class Contact < MailForm::Base
  attribute :name
  attribute :email
  attribute :telephone
  attribute :message

  validates :name, :presence => true

  def headers
    {
      :subject => "Contato no site AWLKA",
      :to => "contato@awlka.com",
      :from => %("#{name}" <#{email}>),
      :'reply-to' => "#{email}"
    }
  end

end