import { FilterImageProps } from "../types/types";
import { ImageFilterComp } from "./ImageFilterComponent";
import { AverageImageFilter } from "../classes/AverageImageFilter";

export const AverageImageFilterComp = ({ updateFilter }: FilterImageProps) => {
  return (
    <>
      <ImageFilterComp
        filterProps={{ updateFilter }}
        filterFactory={(kernel) => new AverageImageFilter(kernel)}
      />
    </>
  );
};
