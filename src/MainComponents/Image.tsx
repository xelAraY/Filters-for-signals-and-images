import { Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { ImageFilter } from "../classes/ImageFilter";
import { AverageImageFilterComp } from "../FilterComponents/AverageImageFilterComp";
import { MedianImageFilterComp } from "../FilterComponents/MedianImageFilterComp";
import { ImageWithLabel } from "../HelpComponents/ImageWithLabel";
import InputFileUpload from "../HelpComponents/InputFile";
import {
  Array2DToRGBPoints,
  formDeltaArray,
  rgbPointsTo2DArray,
} from "../helpFunc/workWithImage";
import {
  ImageFilterType,
  FilterImageElement,
  ImageFilterOptions,
} from "../types/types";
import ClarityImageFilterComp from "../FilterComponents/ClarityImageFilterComp";

const getFilterComponent = (
  filterType: ImageFilterType
): FilterImageElement => {
  switch (filterType) {
    case "average":
      return AverageImageFilterComp;
    case "median":
      return MedianImageFilterComp;
    case "clarity":
      return ClarityImageFilterComp;
    default:
      return () => <></>;
  }
};

const initCanvas = (
  img: HTMLImageElement
): [HTMLCanvasElement, CanvasRenderingContext2D | null] => {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  const context = canvas.getContext("2d");
  if (context) {
    context.drawImage(img, 0, 0, img.width, img.height);
  }
  return [canvas, context];
};

export const Image = () => {
  const [filterType, setFilterStype] = useState<ImageFilterType>("average");
  const [filter, setFilter] = useState<ImageFilter>();
  const [file, setFile] = useState<File>();
  const originalImageRef = useRef<HTMLImageElement>(null);
  const filteredImageRef = useRef<HTMLImageElement>(null);
  const deltaImageRef = useRef<HTMLImageElement>(null);

  const filterHandle = (img: HTMLImageElement) => {
    const [filterCanvas, filterContext] = initCanvas(img);
    const [deltaCanvas, deltaContext] = initCanvas(img);

    if (!filterContext || !deltaContext) {
      filterCanvas.remove();
      deltaCanvas.remove();
      return;
    }

    const filterData = filterContext.getImageData(0, 0, img.width, img.height);
    const deltaData = deltaContext.getImageData(0, 0, img.width, img.height);

    const rootPoints = Array.from(filterData.data);
    const root2D = rgbPointsTo2DArray(rootPoints, img.width, img.height);
    const filteredPoints = Array2DToRGBPoints(
      filter?.getFilteredPoints(root2D) ?? root2D
    );
    const deltaPoints = formDeltaArray(rootPoints, filteredPoints);

    filterData.data.forEach((val, ind) => {
      filterData.data[ind] = filteredPoints[ind];
      if (ind % 4 != 3) {
        deltaData.data[ind] = deltaPoints[ind];
      }
    });

    filterContext.putImageData(filterData, 0, 0);
    deltaContext.putImageData(deltaData, 0, 0);

    if (filteredImageRef.current && deltaImageRef.current) {
      filteredImageRef.current.src = filterCanvas.toDataURL();
      deltaImageRef.current.src = deltaCanvas.toDataURL();
    }
  };

  useEffect(() => {
    if (file) {
      const fr = new FileReader();
      fr.onload = () => {
        if (originalImageRef.current && fr.result) {
          originalImageRef.current.src = fr.result.toString();
          setTimeout(filterHandle, 100, originalImageRef.current);
        }
      };
      fr.readAsDataURL(file);
    }
  }, [file, filter]);

  const FilterComponent = getFilterComponent(filterType);

  return (
    <Stack direction="column" marginTop="15px">
      <Stack alignItems="center">
        <Stack direction="column" width="300px" spacing={2}>
          <Select
            className="basic-single"
            classNamePrefix="select"
            options={ImageFilterOptions}
            defaultValue={ImageFilterOptions[0]}
            onChange={(data) => {
              if (data) {
                setFilterStype(data.value);
              }
            }}
          />
          <InputFileUpload updateFile={setFile} />
        </Stack>
      </Stack>
      <Stack direction="row">
        <FilterComponent updateFilter={setFilter} />
        <Stack alignItems="center" marginTop={2}>
          <Stack direction="column">
            <Stack direction="row">
              <div className="root-image">
                <ImageWithLabel
                  innerRef={originalImageRef}
                  label="Original Image"
                />
              </div>
              <div className="other-images">
                <ImageWithLabel
                  innerRef={filteredImageRef}
                  label="Filtered Image"
                />
              </div>
            </Stack>
            <div className="other-images">
              <ImageWithLabel innerRef={deltaImageRef} label="Difference" />
            </div>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
