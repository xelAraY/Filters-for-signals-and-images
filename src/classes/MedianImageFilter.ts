import { median2DFilter } from "../helpFunc/filter";
import { ImageFilter } from "./ImageFilter";

export class MedianImageFilter extends ImageFilter {
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
        median2DFilter(val, this.kernel)
      );
    }
    return this.filteredPoints;
  }
}
