require 'byebug'
def find_bottom
  input = File.readlines('./input.txt')
  tree_hash = {};
  input.each do |line|
    name_string, child_string = line.split(" -> ")
    child_string = "" unless child_string
    name, weight = name_string.split(" ")
    weight = weight[1...-1].to_i if weight
    unless tree_hash[name]
      tree_hash[name] = Node.new(name, weight)
    else
      tree_hash[name].weight = weight
    end
    tree_hash[name].add_children(tree_hash, child_string)
  end

  tree_hash.values.each do |node|
    return node if node.parent == nil
  end

  nil
end

class Node
  attr_reader :name
  attr_accessor :parent, :children, :weight

  def initialize(name, weight = nil)
    @name = name
    @weight = weight
    @parent = nil
    @children = []
  end

  def add_children(tree_hash, child_string)
    child_string.split(', ').each do |child|
      child = child.chomp("\n")
      tree_hash[child] = Node.new(child) unless tree_hash[child]
      children << tree_hash[child]
      tree_hash[child].parent = self
    end
  end
end

def find_bad_weight(root, bads = [])
  child_weights = root.children.map { |child| [child, find_weight(child)] }
  samesies = []
  samesies << child_weights.shift
  oddsies = []
  child_weights.each do |child|
    if child.last == samesies.first.last
      samesies << child
    else
      oddsies << child
    end
  end

  if samesies.length == 1
    samesies.first << oddsies.first.last
    bads << samesies.first
  elsif oddsies.length == 1
    oddsies.first << samesies.first.last
    bads << oddsies.first
  end

  find_bad_weight(bads.last.first, bads) unless bads.last.first == root
  bad_node = bads.last.first
  target_weight = bads.last.last

  target_weight - bad_node.children.map { |child| find_weight(child) }.reduce(:+)
end

def find_weight(root)
  total_weight = root.weight
  root.children.each do |child|
    total_weight += find_weight(child)
  end

  total_weight
end

puts find_bad_weight(find_bottom)
