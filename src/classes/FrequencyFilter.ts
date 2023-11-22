import { calculateReverseFourier, FourierResults } from "../helpFunc/fourier";
import { DataFilter } from "./DataFilter";

type FrequencyFilterFunction = (fourier: FourierResults) => FourierResults;

export class FrequencyFilter implements DataFilter {
  constructor(
    private points: number[],
    private prevFourier: FourierResults,
    private isHarmonic: boolean,
    private filter: FrequencyFilterFunction
  ) {}

  private filteredFourier: FourierResults | undefined;
  private filteredPoints: number[] | undefined;

  private calcFilteredFourier(): FourierResults {
    return this.filter(this.prevFourier);
  }

  getFilteredAmples(): number[] {
    if (!this.filteredFourier) {
      this.filteredFourier = this.calcFilteredFourier();
    }
    return this.filteredFourier?.amples;
  }

  getFilteredPhases(): number[] {
    if (!this.filteredFourier) {
      this.filteredFourier = this.calcFilteredFourier();
    }
    return this.filteredFourier?.phases;
  }

  getFilteredPoints(): number[] {
    if (!this.filteredPoints) {
      if (!this.filteredFourier) {
        this.filteredFourier = this.calcFilteredFourier();
      }
      this.filteredPoints = calculateReverseFourier(
        this.filteredFourier,
        this.isHarmonic
      );
    }
    return this.filteredPoints;
  }

  getPrevPoints(): number[] {
    return this.points;
  }

  getPrevFourier(): FourierResults {
    return this.prevFourier;
  }
}
