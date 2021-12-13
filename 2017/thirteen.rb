class Layer
  attr_reader :width, :sentry_location, :direction

  def initialize(width)
    @width = width - 1
    @sentry_location = 0
    @direction = :down
  end

  def reset_run
    @sentry_location = 0
    @direction = :down
  end

  def run_setup(num_secs)
    loops = num_secs / width
    @direction = loops % 2 == 0 ? :down : :up
    offset = num_secs % width
    @sentry_location = @direction == :down ? offset : width - offset
  end

  def picosecond_tick
    if direction == :down
      @sentry_location += 1
    else
      @sentry_location -= 1
    end

    if sentry_location == 0 || sentry_location == width
      @direction = @direction == :down ? :up : :down
    end
  end

  def caught?
    sentry_location == 0
  end
end

def firewall_traveler
  input = File.readlines('./thirteen-input.txt')
  firewall = {}
  input.each do |layer|
    depth, width = layer.split(': ').map(&:to_i)
    firewall[depth] = Layer.new(width)
  end
  delay = 10000
  until firewall_run(delay, firewall)
    delay += 1
    puts delay if delay % 500 == 0
  end

  delay
end

def firewall_run(delay, firewall)
  firewall.each do |_, layer|
    layer.reset_run
    layer.run_setup(delay)
  end

  i = 0
  until i > 86
    if firewall[i]
      return false if firewall[i].caught?
    end
    firewall.each { |k, v| v.picosecond_tick }
    i += 1
  end

  true
end

puts firewall_traveler
