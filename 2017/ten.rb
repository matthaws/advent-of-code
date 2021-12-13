input = "106,118,236,1,130,0,235,254,59,205,2,87,129,25,255,118"

def string_hash(lengths)
  string = (0..255).to_a
  startidx = 0
  skip = 0
  lengths = lengths.split('').map(&:ord) + [17, 31, 73, 47, 23]

  64.times do
    lengths.each do |length|
      string = reverse_length(string, length-1, startidx)
      startidx = startidx + length + skip
      startidx = startidx % string.length if startidx >= string.length
      skip += 1
    end
  end
  dense_hash = xor_operator(string)

  dense_hash.map do |bit|
    bit = bit.to_s(16)
    bit = "0#{bit}" if bit.length == 1
    bit
  end.join('')
end

def xor_operator(string)
  startidx = 0
  endidx = 15
  dense_hash = []
  until endidx > 256
    bit = string[startidx]
    string[startidx+1..endidx].each do |num|
      bit = bit ^ num
    end
    dense_hash << bit

    startidx += 16
    endidx += 16
  end

  dense_hash
end

def reverse_length(string, length, startidx)
  endidx = startidx + length
  if endidx >= string.length
    end_length = string.length - startidx
    start_length = length - end_length
    to_be_reversed = string[startidx..-1] + string[0..start_length]

    to_be_reversed.reverse.each do |num|
      startidx = 0 if startidx >= string.length
      string[startidx] = num
      startidx += 1
    end
  else
    string[startidx..endidx] = string[startidx..endidx].reverse
  end

  string
end

# p string_hash(input)
# p xor_operator([65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22])
