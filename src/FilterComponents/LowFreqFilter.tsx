import { LowFreqFilter } from "../classes/LowFreqFilter";
import { FilterProps } from "../types/types";
import { FreqFilter } from "./FreqFilter";

export const LowFreqFilterComponent = ({
  points,
  updateFilter,
  isHarmonic,
}: FilterProps) => {
  return (
    <FreqFilter
      filterProps={{ points, updateFilter }}
      filterFactory={(points, fourier, inputs) =>
        new LowFreqFilter(points, fourier, inputs[0], isHarmonic ?? false)
      }
      freqInputs={[
        {
          name: "Min frequency",
          values: { max: 2048, min: 0 },
        },
      ]}
    />
  );
};
