def hex_grid
  steps = File.read('./input.txt').split(",")
  direction_hash = Hash.new(0)
  farthest = 0
  steps.each do |step|
    step = step.chomp("\n")
    case step
    when "n"
      direction_hash["y"] += 1
      direction_hash["z"] -= 1
    when "ne"
      direction_hash["x"] += 1
      direction_hash["z"] -= 1
    when "nw"
      direction_hash["x"] -= 1
      direction_hash["y"] += 1
    when "se"
      direction_hash["x"] += 1
      direction_hash["y"] -= 1
    when "sw"
      direction_hash["x"] -= 1
      direction_hash["z"] += 1
    when "s"
      direction_hash["y"] -= 1
      direction_hash["z"] += 1
    end

    distance = direction_hash.values.map(&:abs).max
    farthest = distance if distance > farthest
  end

  farthest
end

puts hex_grid
