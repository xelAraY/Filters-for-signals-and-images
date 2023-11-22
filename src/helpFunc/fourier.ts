export interface FourierResults {
  amplesSin: Array<number>;
  amplesCos: Array<number>;
  amples: Array<number>;
  phases: Array<number>;
}

export function calculateFourier(points: Array<number>): FourierResults {
  const res: FourierResults = {
    amples: [],
    amplesCos: [],
    amplesSin: [],
    phases: [],
  };
  const n = points.length;

  for (let j = 0; j < n; j++) {
    let cos = 0;
    let sin = 0;
    for (let i = 0; i < n; i++) {
      cos += points[i] * Math.cos((2 * Math.PI * i * j) / n);
      sin += points[i] * Math.sin((2 * Math.PI * i * j) / n);
    }

    sin *= 2 / n;
    cos *= 2 / n;

    res.amplesSin.push(sin);
    res.amplesCos.push(cos);
    res.amples.push(Math.sqrt(sin * sin + cos * cos));
    res.phases.push(
      Math.abs(res.amples.at(-1) ?? 0) > 1e-10 ? Math.atan2(sin, cos) : 0
    );
  }

  return res;
}

export function calculateReverseFourier(
  fourier: FourierResults,
  isHarmonic?: boolean
): Array<number> {
  const res: Array<number> = [];
  const n = fourier.amples.length;
  for (let i = 0; i < n; i++) {
    let signal = 0;

    for (let j = isHarmonic ? 1 : 0; j < n / 2; j++) {
      signal +=
        fourier.amples[j] *
        Math.cos((2 * Math.PI * i * j) / n - fourier.phases[j]);
    }
    res.push(signal + (isHarmonic ? fourier.amples[0] / 2 : 0));
  }
  return res;
}

export function formSpectrPoints(
  pnts: Array<number>,
  xMult: number
): Array<Array<number>> {
  const totalPnts: Array<Array<number>> = [];
  pnts.map((val, ind) => {
    const x = ind * xMult;
    const y = val;
    if (y != 0) {
      totalPnts.push([x, 0]);
    }
    totalPnts.push([x, y]);

    if (y != 0) {
      totalPnts.push([x, 0]);
    }
  });

  return totalPnts;
}
