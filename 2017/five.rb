def step_increment
  steps = File.readlines('input.txt').map(&:to_i)
  index = 0
  num_steps = 0

  until index >= steps.length || index < 0
    num_steps += 1
    old_index = index
    index += steps[index]

    if steps[old_index] >= 3
      steps[old_index] -= 1
    else
      steps[old_index] += 1
    end
    
  end

  num_steps
end
