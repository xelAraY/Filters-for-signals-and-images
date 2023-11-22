import { useEffect, useState } from "react";
import { DataFilter } from "../classes/DataFilter";
import {
  calculateFourier,
  formSpectrPoints,
  FourierResults,
} from "../helpFunc/fourier";
import { InputParam } from "../HelpComponents/InputParam";
import { FilterProps } from "../types/types";
import { AmplitudeFilter } from "../classes/AmplitudeFilter";
import functionPlot from "function-plot";

type FilterFactory = (
  kernel: number,
  points: number[],
  prevFourier: FourierResults
) => DataFilter;

interface AmplitudeFilterComponent {
  filterProps: FilterProps;
  filterFactory: FilterFactory;
}

export const AmplitudeFilterComponent = ({
  filterProps: { points, updateFilter },
  filterFactory,
}: AmplitudeFilterComponent) => {
  const [kernel, setKernel] = useState(1);

  useEffect(() => {
    updateFilter(() => {
      const controller = filterFactory(
        kernel,
        points,
        calculateFourier(points)
      );

      const pnts = (controller as AmplitudeFilter).getPoints();
      console.log("точки ", pnts);
      pnts.forEach(() =>
        pnts.push(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
      );
      const fourier = formSpectrPoints(calculateFourier(pnts).amples, 1);
      console.log("fourier ", fourier);
      functionPlot({
        target: "#koeffs",
        xAxis: { domain: [0, fourier.length / 4] },
        yAxis: {
          domain: [
            -1.2 * Math.max(...fourier[1]),
            1.2 * Math.max(...fourier[1]),
          ],
        },
        data: [
          {
            points: fourier,
            fnType: "points",
            graphType: "polyline",
          },
        ],
        width: 900,
        height: 350,
        grid: true,
      });
      return controller;
    });
  }, [kernel, points]);

  useEffect(
    () => () => {
      const parent = document.getElementById("koeffs");
      const child = parent?.getElementsByClassName("function-plot");
      if (child && child[0]) {
        parent?.removeChild(child[0]);
      }
    },
    []
  );

  return (
    <>
      <InputParam
        inputName="Kernel"
        onValueUpdate={setKernel}
        values={{ min: 1, max: 19, step: 2 }}
      />
    </>
  );
};
