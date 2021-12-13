def checksum
  spreadsheet = File.readlines('input.txt')
  sum = 0
  spreadsheet.each do |line|
    row = line.split(" ").map(&:to_i)
    row.each_with_index do |num1, idx1|
      row.each_with_index do |num2, idx2|
        next if idx1 == idx2
        if (num1.to_f / num2.to_f) % 1 == 0.0
          sum += (num1 / num2)
        end
      end
    end

    sum
  end

  sum
end
