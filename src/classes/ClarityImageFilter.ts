import { clarity2DFilter } from "../helpFunc/filter";
import { ImageFilter } from "./ImageFilter";

export default class ClarityFilter extends ImageFilter {
  private weightMatrix: Array<Array<number>>;

  private formWeightMatrix(): Array<Array<number>> {
    const result: Array<Array<number>> = [];
    const m = (this.kernel - 1) / 2;
    for (let i = 0; i < this.kernel; i++) {
      const row: Array<number> = [];
      for (let j = 0; j < this.kernel; j++) {
        row.push(i == m && j == m ? this.kernel ** 2 : -1);
      }
      result.push(row);
    }
    return result;
  }

  constructor(kernel: number) {
    super(kernel);
    this.weightMatrix = this.formWeightMatrix();
  }

  private points: Array<Array<Array<number>>> = [];

  private filteredPoints: Array<Array<Array<number>>> | undefined;

  getFilteredPoints(points?: number[][][] | undefined): number[][][] {
    if (points) {
      this.points = points;
    }
    if (!this.filteredPoints) {
      this.filteredPoints = this.points.map((val) =>
        clarity2DFilter(val, this.weightMatrix)
      );
    }
    return this.filteredPoints;
  }
}
