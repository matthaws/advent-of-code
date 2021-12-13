def halfway_digit_sum(input)
  halfway = input.length / 2
  sum = 0

  input.chars.each_with_index do |digit, idx|
    compare_idx = idx + halfway
    compare_idx = compare_idx % input.length if compare_idx > input.length

    sum += digit.to_i if input[compare_idx] == digit
  end

    sum
end
