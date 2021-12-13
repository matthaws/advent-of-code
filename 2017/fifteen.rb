
def dueling_generators
  a, a_factor = 516, 16807
  b, b_factor = 190, 48271
  divisor = 2147483647

  count = 0
  matches = 0
  a_numbers = []
  b_numbers = []
  until a_numbers.length >= 5000000 && b_numbers.length >= 5000000
    a = (a * a_factor) % divisor
    b = (b * b_factor) % divisor
    a_numbers << a if a % 4 == 0
    b_numbers << b if b % 8 == 0

    count += 1
  end
  until a_numbers.empty? || b_numbers.empty?
    matches += 1 if a_numbers.shift.to_s(2)[-16..-1] == b_numbers.shift.to_s(2)[-16..-1]
  end
  matches
end

p dueling_generators
