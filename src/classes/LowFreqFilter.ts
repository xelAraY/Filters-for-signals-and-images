import { lowFreqFilter } from "../helpFunc/filter";
import { FourierResults } from "../helpFunc/fourier";
import { FrequencyFilter } from "./FrequencyFilter";

export class LowFreqFilter extends FrequencyFilter {
  constructor(
    points: number[],
    prevFourier: FourierResults,
    filterValue: number,
    isHarmonic: boolean
  ) {
    super(points, prevFourier, isHarmonic, (f) =>
      lowFreqFilter(f, filterValue)
    );
  }
}
