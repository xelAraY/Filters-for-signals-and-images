import { FunctionPlotDatum, FunctionPlotOptions } from "function-plot";
import React from "react";
import { DataFilter } from "../classes/DataFilter";
import { ImageFilter } from "../classes/ImageFilter";

export type SignalType =
  | "sinus"
  | "rectangle"
  | "triangle"
  | "pylo"
  | "noise"
  | "polyHarmonic"
  | "amplitudeModulation";

export type FilterType =
  | "median"
  | "average"
  | "parabolic"
  | "low-freq"
  | "high-freq"
  | "half-strip";

export type ImageFilterType = "median" | "average" | "clarity";

export type RepresentationType = "signal" | "image";

interface WaveOption {
  value: SignalType;
  label: string;
}

interface FilterOption {
  value: FilterType;
  label: string;
}

interface RepresentationOption {
  value: RepresentationType;
  label: string;
}

interface ImageFilterOption {
  value: ImageFilterType;
  label: string;
}

export const WaveOptions: WaveOption[] = [
  { value: "sinus", label: "SinSignal" },
  { value: "rectangle", label: "Rectangle" },
  { value: "triangle", label: "Triangle" },
  { value: "pylo", label: "Sawtooth" },
  { value: "noise", label: "Noise" },
  { value: "polyHarmonic", label: "Polygarmonic" },
  { value: "amplitudeModulation", label: "Amplitude Modulation" },
];

export const FilterOptions: FilterOption[] = [
  { value: "median", label: "Median" },
  { value: "average", label: "Average" },
  { value: "parabolic", label: "Parabolic" },
  { value: "low-freq", label: "Low frequency" },
  { value: "high-freq", label: "High frequency" },
  { value: "half-strip", label: "Half-strip" },
];

export const RepresentationOptions: RepresentationOption[] = [
  { value: "signal", label: "Signal" },
  { value: "image", label: "Image" },
];

export const ImageFilterOptions: ImageFilterOption[] = [
  { value: "average", label: "Average" },
  { value: "median", label: "Median" },
  //{ value: "clarity", label: "Clarity" },
];

export interface PlotCharacteristics {
  points: number[];
  discr: number;
  width: number;
}

export interface OptionsProps {
  updateDataForPlot: React.Dispatch<
    React.SetStateAction<FunctionPlotDatum | undefined>
  >;
  updatePlotCharacteristics: React.Dispatch<
    React.SetStateAction<PlotCharacteristics>
  >;
}

export interface FilterProps {
  points: Array<number>;
  updateFilter: React.Dispatch<React.SetStateAction<DataFilter | undefined>>;
  isHarmonic?: boolean;
}

export interface FilterImageProps {
  updateFilter: React.Dispatch<React.SetStateAction<ImageFilter | undefined>>;
}

export type OptionsElement = React.FC<OptionsProps>;

export type FilterElement = React.FC<FilterProps>;

export type FilterImageElement = React.FC<FilterImageProps>;
