import { useEffect, useState } from "react";
import { InputParam } from "../HelpComponents/InputParam";
import { FilterImageProps } from "../types/types";
import { ImageFilter } from "../classes/ImageFilter";

type FilterFactory = (kernel: number) => ImageFilter;

interface ImageFilterComponent {
  filterProps: FilterImageProps;
  filterFactory: FilterFactory;
}

export const ImageFilterComp = ({
  filterProps: { updateFilter },
  filterFactory,
}: ImageFilterComponent) => {
  const [kernel, setKernel] = useState(1);

  useEffect(() => {
    updateFilter(filterFactory(kernel));
  }, [kernel]);

  return (
    <>
      <InputParam
        inputName="Kernel"
        onValueUpdate={setKernel}
        values={{ min: 1, max: 15, step: 2 }}
      />
    </>
  );
};
