import { useEffect, useState } from "react";
import { ParabolicFilter } from "../classes/ParabolicFilter";
import { calculateFourier, formSpectrPoints } from "../helpFunc/fourier";
import { InputParam } from "../HelpComponents/InputParam";
import { FilterProps } from "../types/types";
import functionPlot from "function-plot";

export const ParabolicFilterComponent = ({
  points,
  updateFilter,
}: FilterProps) => {
  const [kernel, setKernel] = useState(7);
  useEffect(() => {
    updateFilter(new ParabolicFilter(kernel, points, calculateFourier(points)));

    const pnts = ParabolicFilter.getCoeffs(kernel);
    pnts.forEach(() =>
      pnts.push(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
    );
    const fourier = formSpectrPoints(calculateFourier(pnts).amples, 1);

    functionPlot({
      target: "#koeffs",
      xAxis: { domain: [0, fourier.length / 2] },
      yAxis: {
        domain: [-1.2 * Math.max(...fourier[1]), 1.2 * Math.max(...fourier[1])],
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
        values={{
          max: 13,
          min: 7,
          step: 2,
        }}
      />
    </>
  );
};
