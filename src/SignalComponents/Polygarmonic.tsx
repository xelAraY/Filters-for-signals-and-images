import { Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { calculateFourier, calculateReverseFourier } from "../helpFunc/fourier";
import { OptionsProps } from "../types/types";
import { InputParam } from "../HelpComponents/InputParam";

export const Polygarmonic = ({
  updateDataForPlot,
  updatePlotCharacteristics,
}: OptionsProps) => {
  const [width, setWidth] = useState(0);

  const [ampl1, setAmpl1] = useState(0);
  const [ampl2, setAmpl2] = useState(0);
  const [ampl3, setAmpl3] = useState(0);

  const [freq1, setFreq1] = useState(0);
  const [freq2, setFreq2] = useState(0);
  const [freq3, setFreq3] = useState(0);

  const [phase1, setPhase1] = useState(0);
  const [phase2, setPhase2] = useState(0);
  const [phase3, setPhase3] = useState(0);

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
    const func =
      `${ampl1} * sin(2*x*${Math.PI * freq1} + ${phase1}) + ` +
      `${ampl2} * sin(2*x*${Math.PI * freq2} + ${phase2}) + ` +
      `${ampl3} * sin(2*x*${Math.PI * freq3} + ${phase3})`;

    const pointsForFourie = [];
    for (let i = 0; i < width * discr; i++) {
      const x = i / discr;
      pointsForFourie.push(
        ampl1 * Math.sin(2 * x * Math.PI * freq1 + phase1) +
          ampl2 * Math.sin(2 * x * Math.PI * freq2 + phase2) +
          ampl3 * Math.sin(2 * x * Math.PI * freq3 + phase3)
      );
    }

    updateDataForPlot({ fn: func });
    updatePlotCharacteristics({
      points: pointsForFourie,
      discr,
      width: 1 / width,
    });
  }, [
    ampl1,
    ampl2,
    ampl3,
    freq1,
    freq2,
    freq3,
    phase1,
    phase2,
    phase3,
    discr,
    width,
  ]);
  return (
    <>
      <Stack direction="column">
        <InputParam inputName="Widtd" onValueUpdate={setWidth} />
        <InputParam inputName="Amplitude 1" onValueUpdate={setAmpl1} />
        <InputParam inputName="Amplitude 2" onValueUpdate={setAmpl2} />
        <InputParam inputName="Amplitude 3" onValueUpdate={setAmpl3} />
        <InputParam inputName="Frequency 1" onValueUpdate={setFreq1} />
        <InputParam inputName="Frequency 2" onValueUpdate={setFreq2} />
        <InputParam inputName="Frequency 3" onValueUpdate={setFreq3} />
        <InputParam inputName="Phase 1" onValueUpdate={setPhase1} />
        <InputParam inputName="Phase 2" onValueUpdate={setPhase2} />
        <InputParam inputName="Phase 3" onValueUpdate={setPhase3} />
        <InputParam
          inputName="Diskr"
          values={{ min: 1, max: 512, step: 1 }}
          onValueUpdate={setDiscr}
        />
      </Stack>
    </>
  );
};
