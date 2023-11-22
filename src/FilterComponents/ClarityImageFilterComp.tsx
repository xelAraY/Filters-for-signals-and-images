import ClarityFilter from "../classes/ClarityImageFilter";
import { FilterImageProps } from "../types/types";
import { ImageFilterComp } from "./ImageFilterComponent";

export default function ClarityImageFilterComp({
  updateFilter,
}: FilterImageProps) {
  return (
    <>
      <ImageFilterComp
        filterProps={{ updateFilter }}
        filterFactory={(kernel) => new ClarityFilter(kernel)}
      />
    </>
  );
}
