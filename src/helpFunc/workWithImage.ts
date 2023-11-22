export type RGB2D = [
  red: Array<Array<number>>,
  green: Array<Array<number>>,
  blue: Array<Array<number>>,
  a: Array<Array<number>>
];

export function rgbPointsTo2DArray(
  points: Array<number>,
  width: number,
  height: number
): RGB2D {
  const result: RGB2D = [[], [], [], []];
  for (let i = 0; i < height; i++) {
    const redRow = [];
    const greenRow = [];
    const blueRow = [];
    const aRow = [];
    for (let j = 0; j < width; j++) {
      const index = (i * width + j) * 4;
      redRow.push(points[index]);
      greenRow.push(points[index + 1]);
      blueRow.push(points[index + 2]);
      aRow.push(points[index + 3]);
    }
    result[3].push(aRow);
    result[2].push(blueRow);
    result[1].push(greenRow);
    result[0].push(redRow);
  }
  return result;
}

export function Array2DToRGBPoints(
  matrix: Array<Array<Array<number>>>
): Array<number> {
  const result: Array<number> = [];
  for (let i = 0; i < matrix[0].length; i++) {
    const width = matrix[0][i].length;
    for (let j = 0; j < width; j++) {
      matrix.forEach((val) => result.push(val[i][j]));
    }
  }
  return result;
}

export function formDeltaArray(
  src: Array<number>,
  dest: Array<number>
): Array<number> {
  return src.map((val, ind) => val - dest[ind]);
}
