def spinlock
  count = 0
  idx = 0
  buffer_length = 1
  steps = 348
  highest = 0

  until count == 50000000
    count += 1
    idx = (348 + idx) % buffer_length
    idx += 1
    buffer_length += 1
    highest = count if idx == 1
  end
  p buffer_length
  # buffer[buffer.index(2017) + 1]
  highest
end

p spinlock
