import { medianFilter } from "../helpFunc/filter";
import { FourierResults } from "../helpFunc/fourier";
import { AmplitudeFilter } from "./AmplitudeFilter";

export class MedianFilter extends AmplitudeFilter {
  constructor(points: number[], kernel: number, prevFourier: FourierResults) {
    super(points, kernel, prevFourier, medianFilter);
  }

  getPoints(): number[] {
    const result = [];
    for (let i = 0; i < this.kernel; i++) {
      result.push(1 / this.kernel);
    }
    return result;
  }
}
