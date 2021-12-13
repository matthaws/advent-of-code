def spiral_memory(target)
  max_diff_x = 1
  max_diff_y = 1
  current_diff_x = 1
  current_diff_y = 1

  tracker_hash = Hash.new { |h,k| h[k] = 0 }
  tracker_hash[[0,0]] = 1
  tracker_hash[[1,0]] = 1
  tracker_hash[[1,1]] = 2

  until tracker_hash[[current_diff_x, current_diff_y]] > target
    # top row
    if current_diff_y == max_diff_y
      if current_diff_x == -max_diff_x
        current_diff_y-= 1
      else
        current_diff_x -= 1
      end

    # left side
    elsif current_diff_x == -max_diff_x
      if current_diff_y == -max_diff_y
        current_diff_x += 1
      else
        current_diff_y -= 1
      end

    #bottom side
    elsif current_diff_y == -max_diff_y
      if current_diff_x == max_diff_x
        current_diff_x += 1
        max_diff_y += 1
        max_diff_x += 1
      else
        current_diff_x += 1
      end

    #right side
    elsif current_diff_x == max_diff_x
      if current_diff_y == max_diff_y
        current_diff_x -= 1
      else
        current_diff_y += 1
      end
    end

    sum = 0
    diffs = [-1, 0, 1]
    diffs.each do |x|
      diffs.each do |y|
        sum += tracker_hash[[current_diff_x + x, current_diff_y + y]]
      end
    end
    tracker_hash[[current_diff_x, current_diff_y]] = sum

  end

  tracker_hash[[current_diff_x, current_diff_y]]
end
