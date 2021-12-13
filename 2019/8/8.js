const formLayer = (layer, width) => {
  const rows = [];
  for (let i = 0; i < layer.length; i = i + width) {
    rows.push(layer.slice(i, i + width));
  }

  return rows;
};

const deriveImageLayers = (input, height, width) => {
  const imageLayerSize = height * width;
  const layers = [];
  for (let i = 0; i < input.length; i = i + imageLayerSize) {
    layers.push(input.slice(i, i + imageLayerSize).split(""));
  }

  return layers;
};

// const findFewestZeroLayer = layers => {
//   let fewestZeroLayer;
//   layers.forEach((layer, idx) => {
//     const numZeros = layer.match(/0/g).length;
//     if (!fewestZeroLayer || fewestZeroLayer[0] > numZeros)
//       fewestZeroLayer = [numZeros, idx];
//   });

//   const layer = layers[fewestZeroLayer[1]];
//   return layer.match(/1/g).length * layer.match(/2/g).length;
// };

const decodeImage = (input, height, width) => {
  const layers = deriveImageLayers(input, height, width).map(layer =>
    formLayer(layer, width)
  );
  // console.log(layers);
  const finalImage = layers[0];
  layers.slice(1).forEach(layer => {
    layer.forEach((row, rowIdx) => {
      row.forEach((pixel, colIdx) => {
        if (finalImage[rowIdx][colIdx] === "2") {
          finalImage[rowIdx][colIdx] = pixel;
        }
      });
    });
  });

  return finalImage;
};

const renderImage = decodedImage => {
  decodedImage.forEach(row => {
    console.log(
      row
        .map(pixel => {
          switch (pixel) {
            case "0":
              return "_";
            case "1":
              return "X";
            case "2":
              return " ";
          }
        })
        .join("")
    );
  });
};

const input = require("./input.js");
const image = decodeImage(input, 6, 25);
// console.log(image);
renderImage(image);
