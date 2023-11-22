import { highFreqFilter } from "../helpFunc/filter";
import { FourierResults } from "../helpFunc/fourier";
import { FrequencyFilter } from "./FrequencyFilter";

export class HighFreqFilter extends FrequencyFilter {
  constructor(
    points: number[],
    prevFourier: FourierResults,
    filterValue: number,
    isHarmonic: boolean
  ) {
    super(points, prevFourier, isHarmonic, (f) =>
      highFreqFilter(f, filterValue)
    );
  }
}
