def program_dance
  programs = ("a".."p").to_a
  input = File.read('./sixteen-input.txt').split(',')
  input.each do |move|
    case move[0]
    when "s"
      number = programs.length - move[1].to_i
      programs = programs.drop(number) + programs.take(number)
    when "x"
      spot1 = move[1].to_i
      spot2 = move[3].to_i
      programs[spot1], programs[spot2] = programs[spot2], programs[spot1]
    when "p"
      name1 = move[1]
      name2 = move[3]
      index1 = programs.index(name1)
      index2 = programs.index(name2)
      programs[index1] = name2
      programs[index2] = name1
    end
  end

  programs.join("")
end

p program_dance
