import { useEffect, useState } from "react";
import { DataFilter } from "../classes/DataFilter";
import { calculateFourier, FourierResults } from "../helpFunc/fourier";
import { InputParam } from "../HelpComponents/InputParam";
import { FilterProps } from "../types/types";

interface FreqInputs {
  name: string;
  values: {
    min?: number;
    max: number;
    step?: number;
  };
}

type FreqFilterFactory = (
  points: number[],
  prevFourier: FourierResults,
  inputs: number[]
) => DataFilter;

interface FreqFilterProps {
  filterProps: FilterProps;
  filterFactory: FreqFilterFactory;
  freqInputs: FreqInputs[];
  isHarmonic?: boolean;
}

export const FreqFilter = ({
  filterProps: { points, updateFilter },
  filterFactory,
  freqInputs,
}: FreqFilterProps) => {
  const [freqParams, setFreqParams] = useState<number[]>(
    freqInputs.map((inp) => inp.values.min ?? 0)
  );

  useEffect(() => {
    updateFilter(filterFactory(points, calculateFourier(points), freqParams));
  }, [points, freqParams]);

  return (
    <>
      {freqInputs.map((inp, ind) => (
        <InputParam
          inputName={inp.name}
          values={inp.values}
          onValueUpdate={(val) => {
            const newArr = [...freqParams];
            newArr[ind] = val;
            setFreqParams(newArr);
          }}
        />
      ))}
    </>
  );
};
