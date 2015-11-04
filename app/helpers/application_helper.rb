module ApplicationHelper
  def jumbo_tag
    if current_page?(root_path) || current_page?('/home')
      "jumbo"
    else
      "jumbo jumbo-light"
    end
  end
end
