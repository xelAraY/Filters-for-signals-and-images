import { FourierResults } from "../helpFunc/fourier";

export interface DataFilter {
  getFilteredPoints(): number[];
  getFilteredAmples(): number[];
  getFilteredPhases(): number[];
  getPrevPoints(): number[];
  getPrevFourier(): FourierResults;
}
