require_relative "./ten.rb"
require "byebug"

def make_grid(input_string)
  i = 0
  grid = []
  while i < 128
    row = string_hash("#{input_string}-#{i}")
    row_output = ""
    row.chars.each do |hex_digit|
      binary_value = hex_digit.to_i(16).to_s(2)
      until binary_value.length == 4
        binary_value = "0#{binary_value}"
      end
      row_output = "#{row_output}#{binary_value}"
    end
    grid << row_output
    i += 1
  end

  grid
end

def find_groups
  grid = make_grid("ugkiagan")
  all_groups = []
  grid.each_with_index do |row, x|
    row.chars.each_with_index do |square, y|
      if square == "1" && all_groups.none? { |group| group.include?([x, y]) }
        group = recursive_search([], grid, [x, y])
        all_groups << group
      end
    end
  end

  all_groups.length
end

def recursive_search(group, grid, starting_coord)
  diffs = [-1, 0, 1]

  diffs.each do |diff_x|
    diffs.each do |diff_y|
      next if diff_x == 0 && diff_y == 0
      next unless diff_x == 0 || diff_y == 0
      x, y = starting_coord.first + diff_x, starting_coord.last + diff_y

      next if x > 127 || x < 0
      next if y > 127 || y < 0

      square = grid[x][y]
      coord = [x, y]
      if square == "1" && !group.include?(coord)
        group << coord
        group = recursive_search(group, grid, coord)
      end
    end
  end

  group
end

# p disk_defragment("ugkiagan")
p find_groups
