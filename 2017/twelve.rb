def build_pipe_tree
  pipes = File.readlines('./twelve-input.txt').map(&:chomp)
  collection = {}
  pipes.each do |pipe|
    name, children = pipe.split(' <-> ')
    collection[name] = children
  end

  collection
end

def program_pipes
  pipe_tree = build_pipe_tree
  total = (0..1999).to_a.map(&:to_s)
  num_groups = 0
  until total.empty?
    total = find_group(total, pipe_tree)
    num_groups += 1
  end

  num_groups
end

def find_group(remaining, pipe_tree)
  collection = [remaining.shift]
  queue = [collection.first]
  until queue.empty?
    current = queue.shift
    pipe_tree[current].split(', ').each do |child|
      unless collection.include?(child)
        queue << child
        collection << child
        remaining.delete(child)
      end
    end
  end
  remaining
end
puts program_pipes
