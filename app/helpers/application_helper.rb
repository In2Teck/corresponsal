#!/bin/env ruby
# encoding: utf-8

module ApplicationHelper

	NEXT_LBL = " →"
  PREV_LBL = "← "

  def sortable(column, title = nil, filter = nil)
    title ||= column.titleize
    css_class = (column == sort_column) ? "current #{sort_direction}" : nil  
    direction = column == sort_column && sort_direction == "ASC" ? "DESC" : "ASC"
    if (filter != nil)
    	link_to title, "#", {:class => css_class, :onclick => "filterResults('#{column}', '#{direction}')"}
    else
    	link_to title, {:sort => column, :direction => direction}, {:class => css_class}
    end
  end

end
