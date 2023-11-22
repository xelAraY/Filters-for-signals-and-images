import { MedianFilter } from "../classes/MedianFilter";
import { FilterProps } from "../types/types";
import { AmplitudeFilterComponent } from "./AmplitudeFilter";

export const Median = ({ points, updateFilter }: FilterProps) => {
  return (
    <>
      <AmplitudeFilterComponent
        filterProps={{ points, updateFilter }}
        filterFactory={(kernel, points, fourier) =>
          new MedianFilter(points, kernel, fourier)
        }
      />
    </>
  );
};
