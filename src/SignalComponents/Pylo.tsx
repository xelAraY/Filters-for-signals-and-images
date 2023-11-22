import { Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { tan } from "mathjs";
import { calculateFourier, calculateReverseFourier } from "../helpFunc/fourier";
import { OptionsProps } from "../types/types";
import { InputParam } from "../HelpComponents/InputParam";

export const Pylo = ({
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
    const func = `-2 * ${amplitude / Math.PI} * atan(1 / tan(${
      Math.PI * freq
    } * x + ${phase}))`;
    const pointsForFourie = [];
    for (let i = 0; i < width * discr; i++) {
      pointsForFourie.push(
        ((-2 * amplitude) / Math.PI) *
          Math.atan(1 / Math.tan((Math.PI * freq * i) / discr + phase))
      );
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
