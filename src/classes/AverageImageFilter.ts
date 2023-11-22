import { average2DFilter } from "../helpFunc/filter";
import { ImageFilter } from "./ImageFilter";

export class AverageImageFilter extends ImageFilter {
  constructor(kernel: number) {
    super(kernel);
  }

  private points: number[][][] = [];
  private filteredPoints: number[][][] | undefined;

  getFilteredPoints(points?: number[][][] | undefined): number[][][] {
    if (points) {
      this.points = points;
    }

    if (!this.filteredPoints) {
      this.filteredPoints = this.points.map((val) =>
        average2DFilter(val, this.kernel)
      );
    }
    return this.filteredPoints;
  }
}
