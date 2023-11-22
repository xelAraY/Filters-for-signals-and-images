import { Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { OptionsProps } from "../types/types";
import { InputParam } from "../HelpComponents/InputParam";

export const Noise = ({
  updateDataForPlot,
  updatePlotCharacteristics,
}: OptionsProps) => {
  const [width, setWidth] = useState(1);
  const [amplitude, setAmplitude] = useState(0);
  const [discr, setDiscr] = useState(1);

  useEffect(() => {
    updateDataForPlot({
      fn: `${amplitude}*(2*${Math.random()} - 1)`,
    });
  }, [amplitude, width, discr]);

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
    [amplitude, discr, width]
  );

  return (
    <>
      <Stack direction="column">
        <InputParam inputName="Width" onValueUpdate={setWidth} />
        <InputParam inputName="Amplitude" onValueUpdate={setAmplitude} />
        <InputParam
          inputName="Discr"
          onValueUpdate={setDiscr}
          values={{ min: 1, max: 512, step: 2 }}
        />
      </Stack>
    </>
  );
};
