def password_checker
  passes = File.readlines('input.txt')
  valid = 0
  passes.each do |pass_line|
    valid += 1 if password_helper?(pass_line)
  end

  valid
end

def password_helper?(pass_line)
  seen = []
  pass_line.split(" ").each do |pass|
    if seen.include?(pass.split("").sort.join(""))
      return false
    else
      seen << pass.split("").sort.join("")
    end
  end
  true
end
