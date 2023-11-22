import { calculateFourier, FourierResults } from "../helpFunc/fourier";
import { DataFilter } from "./DataFilter";

type AmplitudeFilterFunction = (points: number[], kernel: number) => number[];

export abstract class AmplitudeFilter implements DataFilter {
  constructor(
    private points: number[],
    protected kernel: number,
    private prevFourier: FourierResults,
    private filter: AmplitudeFilterFunction
  ) {}

  private filteredFourier: FourierResults | undefined;
  private filteredPoints: number[] | undefined;

  private initializeFilteredFourier(): FourierResults {
    if (!this.filteredPoints) {
      this.filteredPoints = this.filter(this.points, this.kernel);
    }
    return calculateFourier(this.filteredPoints);
  }

  getFilteredAmples(): number[] {
    if (!this.filteredFourier) {
      this.filteredFourier = this.initializeFilteredFourier();
    }
    return this.filteredFourier.amples;
  }

  getFilteredPoints(): number[] {
    if (!this.filteredPoints) {
      this.filteredPoints = this.filter(this.points, this.kernel);
    }
    return this.filteredPoints;
  }

  getFilteredPhases(): number[] {
    if (!this.filteredFourier) {
      this.filteredFourier = this.initializeFilteredFourier();
    }
    return this.filteredFourier.phases;
  }

  getPrevPoints(): number[] {
    return this.points;
  }

  getPrevFourier(): FourierResults {
    return this.prevFourier;
  }

  abstract getPoints(): number[];
}
