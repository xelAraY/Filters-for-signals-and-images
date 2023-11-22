import { halfStripFreqFilter, lowFreqFilter } from "../helpFunc/filter";
import { FourierResults } from "../helpFunc/fourier";
import { FrequencyFilter } from "./FrequencyFilter";

export class HalfFreqFilter extends FrequencyFilter {
  constructor(
    points: number[],
    prevFourier: FourierResults,
    minFreq: number,
    maxFreq: number,
    isHarmonic: boolean
  ) {
    super(points, prevFourier, isHarmonic, (f) =>
      halfStripFreqFilter(f, minFreq, maxFreq)
    );
  }
}
