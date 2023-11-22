import { HalfFreqFilter } from "../classes/HalfStripFreqFilter";
import { FilterProps } from "../types/types";
import { FreqFilter } from "./FreqFilter";

export const HalfStripFilter = ({
  points,
  updateFilter,
  isHarmonic,
}: FilterProps) => {
  return (
    <FreqFilter
      filterProps={{ points, updateFilter }}
      filterFactory={(points, fourier, inputs) =>
        new HalfFreqFilter(
          points,
          fourier,
          inputs[0],
          inputs[1],
          isHarmonic ?? false
        )
      }
      freqInputs={[
        {
          name: "Min frequency",
          values: { max: 2048, min: 0 },
        },
        { name: "Max frequency", values: { max: 2048, min: 0 } },
      ]}
      isHarmonic={isHarmonic}
    />
  );
};
