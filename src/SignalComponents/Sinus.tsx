import { Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { calculateFourier, calculateReverseFourier } from "../helpFunc/fourier";
import { OptionsProps } from "../types/types";
import { InputParam } from "../HelpComponents/InputParam";

export const Sinus = ({
  updateDataForPlot,
  updatePlotCharacteristics,
}: OptionsProps) => {
  const [width, setWidth] = useState(1);
  const [amplitude, setAmplitude] = useState(0);
  const [freq, setFreq] = useState(0);
  const [phase, setPhase] = useState(0);
  const [discr, setDiscr] = useState(1);

  useEffect(
    () => () => {
      const ids = ["graph"];
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
    const func = `${amplitude} * sin(2*x*${Math.PI * freq} + ${phase})`;

    const pointsForFourie: Array<number> = [];
    for (let i = 0; i < discr * width; i++) {
      const value =
        amplitude * Math.sin(2 * (i / discr) * Math.PI * freq + phase);
      pointsForFourie.push(value);
    }

    updateDataForPlot({ fn: func });
    updatePlotCharacteristics({
      points: pointsForFourie,
      discr,
      width: 1 / width,
    });
  }, [amplitude, freq, phase, discr, width]);
  return (
    <>
      <Stack direction="column">
        <InputParam inputName="Width" onValueUpdate={setWidth} />
        <InputParam inputName="Amplitude" onValueUpdate={setAmplitude} />
        <InputParam inputName="Frequency" onValueUpdate={setFreq} />
        <InputParam inputName="Phase" onValueUpdate={setPhase} />
        <InputParam
          inputName="Diskr"
          values={{ min: 1, max: 512, step: 1 }}
          onValueUpdate={setDiscr}
        />
      </Stack>
    </>
  );
};
