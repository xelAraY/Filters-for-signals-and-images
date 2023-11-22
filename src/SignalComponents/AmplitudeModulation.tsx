import React from "react";
import { InputParam } from "../HelpComponents/InputParam";
import { OptionsProps } from "../types/types";

export default function AmplitudeModulation({
  updateDataForPlot,
  updatePlotCharacteristics,
}: OptionsProps) {
  const [width, setWidth] = React.useState(0);
  const [amplitude, setAmplitude] = React.useState(0);
  const [ampl1, setAmpl1] = React.useState(0);
  const [freq, setFreq] = React.useState(0);
  const [freq1, setFreq1] = React.useState(0);
  const [phase, setPhase] = React.useState(0);
  const [phase1, setPhase1] = React.useState(0);
  const [discr, setDiscr] = React.useState(1);

  React.useEffect(() => {
    const func =
      `${amplitude} * sin(2*x*${Math.PI * freq} + ${phase}) * ` +
      `2 * ${ampl1 / Math.PI} * asin(sin(${
        2 * Math.PI * freq1
      } * x + ${phase1}))`;

    const pointsForFourie = [];
    for (let i = 0; i < width * discr; i++) {
      const x = i / discr;
      pointsForFourie.push(
        ((amplitude * Math.sin(2 * x * Math.PI * freq + phase) * 2 * ampl1) /
          Math.PI) *
          Math.asin(Math.sin(2 * Math.PI * freq1 * x + phase1))
      );
    }
    updatePlotCharacteristics?.({
      points: pointsForFourie,
      discr,
      width: 1 / width,
    });
    updateDataForPlot({
      fn: func,
    });
  }, [amplitude, freq, phase, discr, ampl1, freq1, phase1, width]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1%",
        }}
      >
        <InputParam
          inputName="Width"
          values={{ max: 3, step: 0.01 }}
          onValueUpdate={setWidth}
        />
        <InputParam
          inputName="Carrier signal amplitude"
          values={{ max: 20 }}
          onValueUpdate={setAmplitude}
        />
        <InputParam
          inputName="Desired signal amplitude"
          values={{ max: 20 }}
          onValueUpdate={setAmpl1}
        />

        <InputParam
          inputName="Carrier signal frequency"
          values={{ max: 64 }}
          onValueUpdate={setFreq}
        />
        <InputParam
          inputName="Desired signal frequency"
          values={{ max: 64 }}
          onValueUpdate={setFreq1}
        />

        <InputParam
          inputName="Carrier signal start phase"
          values={{ max: 2 * Math.PI, step: 0.01 }}
          onValueUpdate={setPhase}
        />
        <InputParam
          inputName="Desired signal start phase"
          values={{ max: 2 * Math.PI, step: 0.01 }}
          onValueUpdate={setPhase1}
        />

        <InputParam
          inputName="Discr"
          values={{ max: 64 * 4, min: 1 }}
          onValueUpdate={setDiscr}
        />
      </div>
    </>
  );
}
