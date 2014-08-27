class Contact < MailForm::Base
  attribute :name,    :validate => true
  attribute :email,   :validate => /\A([\w\.%\+\-]+)@([\w\-]+\.)+([\w]{2,})\z/i
  attribute :telephone
  attribute :message

  def headers
    {
      :subject => "Contato de #{name} (#{email}) no site AWLKA",
      :to => "contato@awlka.com",
      :from => %("#{name}" <#{email}>),
      :'reply-to' => "#{email}"
    }
  end

end