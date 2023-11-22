import { Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { calculateFourier, calculateReverseFourier } from "../helpFunc/fourier";
import { OptionsProps } from "../types/types";
import { InputParam } from "../HelpComponents/InputParam";

const mod = (x: number, y: number) => {
  return x - y * Math.floor(x / y);
};

export const Rectangle = ({
  updateDataForPlot,
  updatePlotCharacteristics,
}: OptionsProps) => {
  const [width, setWidth] = useState(1);
  const [amplitude, setAmplitude] = useState(0);
  const [period, setPeriod] = useState(1);
  const [dc, setDc] = useState(0.5);
  const [discr, setDiscr] = useState(1);

  useEffect(
    () => () => {
      const ids = ["graph", "ampl", "phase"];
      ids.forEach((name) => {
        const parent = document.getElementById(name);
        const child = parent?.getElementsByClassName("function-plot");
        if (child && child[0]) {
          parent?.removeChild(child[0]);
        }
      });
    },
    []
  );

  useEffect(() => {
    const func = `mod(x, ${period})/${period} < ${dc} ? ${amplitude} : ${-amplitude}`;
    const pointsForFourie: Array<number> = [];
    for (let i = 0; i < width * discr; i++) {
      pointsForFourie.push(
        mod(i / discr, period) / period < dc ? amplitude : -amplitude
      );
    }

    updateDataForPlot({ fn: func });
    updatePlotCharacteristics({
      points: pointsForFourie,
      discr,
      width: 1 / width,
    });
  }, [amplitude, dc, period, discr, width]);
  return (
    <>
      <Stack direction="column">
        <InputParam inputName="Width" onValueUpdate={setWidth} />
        <InputParam inputName="Amplitude" onValueUpdate={setAmplitude} />
        <InputParam inputName="Period" onValueUpdate={setPeriod} />
        <InputParam
          inputName="Dc"
          onValueUpdate={setDc}
          values={{ min: 0.01, max: 1, step: 0.01 }}
        />
        <InputParam
          inputName="Diskr"
          values={{ min: 1, max: 512, step: 1 }}
          onValueUpdate={setDiscr}
        />
      </Stack>
    </>
  );
};
