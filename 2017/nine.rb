def stream_processor
  stream = File.read('./input.txt')
  score_count = 0
  point_value = 0
  i = 0
  inside_garbage = false
  canceled_characters = 0

  while i < stream.length
    if inside_garbage
      case stream[i]
      when ">"
        inside_garbage = false
      when "!"
        i += 1
      else
        canceled_characters += 1
      end
    else
      case stream[i]
      when "}"
        score_count += point_value
        point_value -= 1
      when "{"
        point_value += 1
      when "!"
        i += 1
      when "<"
        inside_garbage = true
      end
    end
    i += 1
  end
  canceled_characters
end

puts stream_processor
