import { HighFreqFilter } from "../classes/HighFreqFilter";
import { FilterProps } from "../types/types";
import { FreqFilter } from "./FreqFilter";

export const HighFreqFilterComponent = ({
  points,
  updateFilter,
  isHarmonic,
}: FilterProps) => {
  return (
    <FreqFilter
      filterProps={{ points, updateFilter }}
      filterFactory={(points, fourier, inputs) =>
        new HighFreqFilter(points, fourier, inputs[0], isHarmonic ?? false)
      }
      freqInputs={[
        {
          name: "Max frequency",
          values: { max: 2048, min: 0 },
        },
      ]}
    />
  );
};
