import { FilterProps } from "../types/types";
import { AmplitudeFilterComponent } from "./AmplitudeFilter";
import { AverageFilter } from "../classes/AverageFilter";

export const Average = ({ points, updateFilter }: FilterProps) => {
  return (
    <>
      <AmplitudeFilterComponent
        filterProps={{ points, updateFilter }}
        filterFactory={(kernel, points, fourier) =>
          new AverageFilter(points, kernel, fourier)
        }
      />
    </>
  );
};
