require 'byebug'

def registers
  regs_value = {}
  regs = []
  regs_string = File.readlines('./input.txt')
  regs_string.each do |reg|
    reg_name = reg.split(' ').first
    regs << reg
    regs_value[reg_name] = 0
  end

  highest = 0
  regs.each do |reg_string|
    reg_name, action, amount, x, compare_reg, comparator, compared_amount = reg_string.split(" ")
    if regs_value[compare_reg].send(comparator.to_sym, compared_amount.to_i)
      regs_value[reg_name] += amount.to_i if action == 'inc'
      regs_value[reg_name] -= amount.to_i if action == 'dec'
      highest = regs_value[reg_name] if regs_value[reg_name] > highest
    end
  end

  highest
end

puts registers
