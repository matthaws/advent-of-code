const buildFileTree = require("./buildFileFolderTree");
const inputParser = require("../inputParser.ts");
const commands = inputParser("day-7.txt", "text");

const sumDirectories = (fileTree: any, sizeList: number[]) => {
  let size = 0;
  Object.keys(fileTree).forEach((file) => {
    if (typeof fileTree[file] === "object") {
      const subSize = sumDirectories(fileTree[file], sizeList);
      sizeList.push(subSize);
      size += subSize;
    } else {
      size += Number(fileTree[file]);
    }
  });

  return size;
};

const findSumOfAllDirectoriesLessThan = (tree: any, size: number) => {
  const sizeList: number[] = [];
  sumDirectories(tree, sizeList);

  return sizeList
    .filter((folderSize) => folderSize <= size)
    .reduce((sum, val) => sum + val, 0);
};

const MAX_FILE_SIZE = 70000000;

const findSmallestDirectoryToAchieveSpace = (
  tree: any,
  spaceRequired: number
) => {
  const sizeList: number[] = [];
  const unusedSpace = MAX_FILE_SIZE - sumDirectories(tree, sizeList);
  console.log(unusedSpace)
  const amountToDelete = spaceRequired - unusedSpace;
  return Math.min(...sizeList.filter((fileSize) => fileSize >= amountToDelete));
};

const tree = buildFileTree(commands);
console.log(tree);
console.log(findSmallestDirectoryToAchieveSpace(tree, 30000000));
