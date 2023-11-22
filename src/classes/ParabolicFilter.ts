import { parabolicFilter } from "../helpFunc/filter";
import { FourierResults } from "../helpFunc/fourier";
import { AmplitudeFilter } from "./AmplitudeFilter";

export class ParabolicFilter extends AmplitudeFilter {
  private static koeffs: Array<Array<number>> = [
    [5, -30, 75, 113, 75, -30, 5],
    [15, -55, 30, 135, 179, 135, 30, -55, 15],
    [18, -45, -10, 60, 120, 143, 120, 60, -10, -45, 18],
    [110, -198, -135, 110, 390, 600, 677, 600, 390, 110, -135, -198, 110],
  ];

  private static delivers: Array<number> = ParabolicFilter.koeffs.map((arr) =>
    arr.reduce((prev, curr) => prev + curr, 0)
  );

  constructor(
    kernel: number,
    points: Array<number>,
    prevFourier: FourierResults
  ) {
    const ind = (kernel - 1) / 2 - 3;
    super(points, kernel, prevFourier, (pnts, kernel) =>
      parabolicFilter(
        pnts,
        ParabolicFilter.koeffs[ind],
        ParabolicFilter.delivers[ind],
        kernel
      )
    );
  }

  static getCoeffs(kernel: number): number[] {
    return [...this.koeffs[(kernel - 1) / 2 - 3]];
  }

  getPoints(): number[] {
    return ParabolicFilter.getCoeffs(this.kernel);
  }
}
