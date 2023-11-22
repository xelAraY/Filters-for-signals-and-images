import { FourierResults } from "./fourier";

type CompareFunction = (val: number) => boolean;

export function medianFilter(
  pnts: Array<number>,
  kernel: number
): Array<number> {
  const result: Array<number> = [];
  const m = (kernel - 1) / 2;

  for (let i = 0; i < pnts.length; i++) {
    const kernelArr: Array<number> = [];
    for (let j = i - m; j <= i + m; j++) {
      kernelArr.push(
        j < 0 ? pnts[0] : j >= pnts.length ? pnts[pnts.length - 1] : pnts[j]
      );
    }
    result.push(kernelArr.sort((a, b) => a - b)[m]);
  }
  return result;
}

export function averageFilter(
  pnts: Array<number>,
  kernel: number
): Array<number> {
  const result: Array<number> = [];
  const m = (kernel - 1) / 2;

  for (let i = 0; i < pnts.length; i++) {
    const kernelArr: Array<number> = [];
    for (let j = i - m; j <= i + m; j++) {
      kernelArr.push(
        j < 0 ? pnts[0] : j >= pnts.length ? pnts[pnts.length - 1] : pnts[j]
      );
    }

    let sum = 0;
    kernelArr.forEach((val) => (sum += val));
    result.push(sum / kernel);
  }
  return result;
}

export function parabolicFilter(
  pnts: Array<number>,
  koeffs: Array<number>,
  totalDeliver: number,
  kernel: number
): Array<number> {
  const result: Array<number> = [];
  const m = (kernel - 1) / 2;
  for (let i = 0; i < pnts.length; i++) {
    let sum = 0;
    for (let j = 0; j < kernel; j++) {
      const ind = i + j - m;
      const el =
        ind < 0
          ? pnts[0]
          : ind >= pnts.length
          ? pnts[pnts.length - 1]
          : pnts[ind];
      sum += koeffs[j] * el;
    }
    result.push(sum / totalDeliver);
  }
  return result;
}

function windowFreqFilter(
  fourier: FourierResults,
  compFunc: CompareFunction
): FourierResults {
  const amples: Array<number> = [];
  const phases: Array<number> = [];
  fourier.amples.forEach((val: number, ind: number) => {
    let ample: number;
    let phase: number;
    if (compFunc(ind)) {
      ample = val;
      phase = fourier.phases[ind];
    } else {
      ample = 0;
      phase = 0;
    }
    phases.push(phase);
    amples.push(ample);
  });
  return {
    ...fourier,
    amples: amples,
    phases: phases,
  };
}

export function lowFreqFilter(
  fourier: FourierResults,
  filterValue: number
): FourierResults {
  return windowFreqFilter(fourier, (val) => val <= filterValue);
}

export function highFreqFilter(
  fourier: FourierResults,
  filterValue: number
): FourierResults {
  return windowFreqFilter(fourier, (val) => val >= filterValue);
}

export function halfStripFreqFilter(
  fourier: FourierResults,
  minFilter: number,
  maxFilter: number
): FourierResults {
  return windowFreqFilter(
    fourier,
    (val) => val >= minFilter && val <= maxFilter
  );
}

function isCorrectXY(
  x: number,
  y: number,
  width: number,
  height: number
): boolean {
  return x >= 0 && x < width && y >= 0 && y < height;
}

export function median2DFilter(
  points: Array<Array<number>>,
  kernel: number
): Array<Array<number>> {
  const result: Array<Array<number>> = [];
  for (let i = 0; i < points.length; i++) {
    const row: Array<number> = [];
    for (let j = 0; j < points[i].length; j++) {
      const kernelPoints: Array<number> = [];
      const m = (kernel - 1) / 2;
      for (let y = i - m; y <= i + m; y++) {
        for (let x = j - m; x <= j + m; x++) {
          kernelPoints.push(
            isCorrectXY(x, y, points[i].length, points.length)
              ? points[y][x]
              : 0
          );
        }
      }
      row.push(kernelPoints.sort((a, b) => a - b)[(kernel ** 2 - 1) / 2]);
    }
    result.push(row);
  }
  return result;
}

export function average2DFilter(
  points: Array<Array<number>>,
  kernel: number
): Array<Array<number>> {
  const result: Array<Array<number>> = [];
  for (let i = 0; i < points.length; i++) {
    const row: Array<number> = [];
    for (let j = 0; j < points[i].length; j++) {
      let sum = 0;
      const m = (kernel - 1) / 2;
      for (let y = i - m; y <= i + m; y++) {
        for (let x = j - m; x <= j + m; x++) {
          sum += isCorrectXY(x, y, points[i].length, points.length)
            ? points[y][x]
            : 0;
        }
      }
      row.push(sum / kernel ** 2);
    }
    result.push(row);
  }
  return result;
}

export function clarity2DFilter(
  points: Array<Array<number>>,
  weightMatrix: Array<Array<number>>
) {
  const kernel = weightMatrix.length;
  const m = (kernel - 1) / 2;
  const result: Array<Array<number>> = [];

  for (let i = 0; i < points.length; i++) {
    const row: Array<number> = [];
    for (let j = 0; j < points[i].length; j++) {
      let sum = 0;
      for (let y = 0; y < kernel; y++) {
        for (let x = 0; x < kernel; x++) {
          const newI = i + y - m;
          const newJ = j + x - m;
          sum +=
            weightMatrix[y][x] *
            (isCorrectXY(newJ, newI, points[i].length, points.length)
              ? points[newI][newJ]
              : 0);
        }
      }
      row.push(sum);
    }
    result.push(row);
  }

  return result;
}
