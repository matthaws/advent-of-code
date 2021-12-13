require 'byebug'
input = [2, 8, 8,	5, 4,	2, 3, 1, 5, 5, 1, 2, 15, 13, 5, 14]

def block_distributer(input)
  tracker_hash = {}
  current = input
  count = 0
  until tracker_hash[current]
    count += 1
    tracker_hash[current.dup] = count
    max = current.max
    idx = current.index(max)
    blocks = current[idx]
    current[idx] = 0
    idx += 1
    until blocks == 0
      idx = 0 if idx >= input.length
      current[idx] += 1
      idx += 1
      blocks -= 1
    end
  end
  count += 1
  count - tracker_hash[current]
end

puts block_distributer(input)
