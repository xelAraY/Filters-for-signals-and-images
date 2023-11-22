import { FilterImageProps } from "../types/types";
import { ImageFilterComp } from "./ImageFilterComponent";
import { MedianImageFilter } from "../classes/MedianImageFilter";

export const MedianImageFilterComp = ({ updateFilter }: FilterImageProps) => {
  return (
    <>
      <ImageFilterComp
        filterProps={{ updateFilter }}
        filterFactory={(kernel) => new MedianImageFilter(kernel)}
      />
    </>
  );
};
