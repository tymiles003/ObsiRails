module ApplicationHelper
  def jumbo_tag
    if current_page?(root_path)
      "jumbo"
    else
      "jumbo jumbo-light"
    end
  end
end
