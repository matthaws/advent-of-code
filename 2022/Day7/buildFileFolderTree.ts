const get = require("lodash.get");
const set = require("lodash.set");

const buildTree = (input: string[]) => {
  const currentPos: string[] = [];
  const tree: any = {};
  input.forEach((line) => {
    const keyPath = currentPos.join(".");
    if (line.startsWith("$")) {
      const [_, command, dir] = line.split(" ");
      if (command.startsWith("cd")) {
        if (dir === "..") {
          currentPos.pop();
        } else {
          currentPos.push(dir);
          if (!get(tree, keyPath)) set(tree, keyPath, {});
        }
      }
    } else {
      const [type, name] = line.split(" ");
      set(tree, keyPath, {
        ...get(tree, keyPath),
        [name]: type === "dir" ? {} : type,
      });
    }
  });

  delete tree['']

  return tree;
};

module.exports = buildTree;
