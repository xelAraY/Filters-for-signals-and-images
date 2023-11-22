import { Stack, Tab, Tabs, Typography } from "@mui/material";
import functionPlot, { FunctionPlotDatum } from "function-plot";
import { useEffect, useState } from "react";
import Select from "react-select";
import { DataFilter } from "../classes/DataFilter";
import { Average } from "../FilterComponents/AverageFilter";
import { HalfStripFilter } from "../FilterComponents/HalfFreqFilter";
import { HighFreqFilterComponent } from "../FilterComponents/HighFreqFilter";
import { LowFreqFilterComponent } from "../FilterComponents/LowFreqFilter";
import { Median } from "../FilterComponents/Median";
import { ParabolicFilterComponent } from "../FilterComponents/ParabolicFilter";
import { formSpectrPoints } from "../helpFunc/fourier";
import AmplitudeModulation from "../SignalComponents/AmplitudeModulation";
import { Noise } from "../SignalComponents/Noise";
import { Polygarmonic } from "../SignalComponents/Polygarmonic";
import { Pylo } from "../SignalComponents/Pylo";
import { Rectangle } from "../SignalComponents/Rectangle";
import { Sinus } from "../SignalComponents/Sinus";
import { Triangle } from "../SignalComponents/Trinagle";
import {
  FilterElement,
  FilterOptions,
  FilterType,
  OptionsElement,
  PlotCharacteristics,
  SignalType,
  WaveOptions,
} from "../types/types";

const drawPlots = (filter: DataFilter | undefined, width: number): void => {
  if (!filter) return;

  const amplesPrev = filter.getPrevFourier().amples;
  const amples = filter.getFilteredAmples();
  functionPlot({
    target: "#amplPrev",
    xAxis: { domain: [0, amplesPrev.length * width] },
    yAxis: { domain: [-1.2 * 20, 1.2 * 20] },
    data: [
      {
        points: formSpectrPoints(amplesPrev, width),
        fnType: "points",
        graphType: "polyline",
      },
    ],
    width: 900,
    height: 350,
    grid: true,
  });
  functionPlot({
    target: "#ampl",
    xAxis: { domain: [0, amples.length * width] },
    yAxis: { domain: [-1.2 * 20, 1.2 * 20] },
    data: [
      {
        points: formSpectrPoints(amples, width),
        fnType: "points",
        graphType: "polyline",
      },
    ],
    width: 900,
    height: 350,
    grid: true,
  });

  const prevPhase = filter.getPrevFourier().phases;
  const phases = filter.getFilteredPhases();
  functionPlot({
    target: "#phasePrev",
    xAxis: { domain: [0, prevPhase.length * width] },
    yAxis: { domain: [-1.1 * Math.PI, 1.1 * Math.PI] },
    data: [
      {
        points: formSpectrPoints(prevPhase, width),
        fnType: "points",
        graphType: "polyline",
      },
    ],
    width: 900,
    height: 350,
    grid: true,
  });
  functionPlot({
    target: "#phase",
    xAxis: { domain: [0, phases.length * width] },
    yAxis: { domain: [-1.1 * Math.PI, 1.1 * Math.PI] },
    data: [
      {
        points: formSpectrPoints(phases, width),
        fnType: "points",
        graphType: "polyline",
      },
    ],
    width: 900,
    height: 350,
    grid: true,
  });
};

function getSignalComponent(waveType: SignalType): OptionsElement {
  switch (waveType) {
    case "sinus":
      return Sinus;
    case "rectangle":
      return Rectangle;
    case "triangle":
      return Triangle;
    case "pylo":
      return Pylo;
    case "noise":
      return Noise;
    case "polyHarmonic":
      return Polygarmonic;
    case "amplitudeModulation":
      return AmplitudeModulation;
    default:
      return () => <></>;
  }
}

function getFilterComponent(filterType: FilterType): FilterElement {
  switch (filterType) {
    case "median":
      return Median;
    case "average":
      return Average;
    case "parabolic":
      return ParabolicFilterComponent;
    case "low-freq":
      return LowFreqFilterComponent;
    case "high-freq":
      return HighFreqFilterComponent;
    case "half-strip":
      return HalfStripFilter;
    default:
      return () => <></>;
  }
}

export const Signal = () => {
  const [waveType, setWaveType] = useState<SignalType>("sinus");
  const [filterType, setFilterType] = useState<FilterType>("average");
  const [filter, setFilter] = useState<DataFilter>();

  const [plotCharacteristics, setPlorCharacteristics] =
    useState<PlotCharacteristics>({
      points: [],
      discr: 0,
      width: 0,
    });
  const [signalData, setSignalData] = useState<FunctionPlotDatum>();

  const SignalComponent = getSignalComponent(waveType);
  const FilterComponent = getFilterComponent(filterType);

  useEffect(() => {
    const filteredPoints = (filter?.getFilteredPoints() ?? []).map(
      (val, ind) => [ind / plotCharacteristics.discr, val]
    );

    const prevLength = filteredPoints.length;
    if (prevLength != 0) {
      for (let i = prevLength; i / plotCharacteristics.discr <= 3; i++) {
        filteredPoints.push([
          i / plotCharacteristics.discr,
          filteredPoints[i % prevLength][1],
        ]);
      }
    }

    const data: FunctionPlotDatum[] = [];
    if (signalData) {
      data.push(signalData);
    }
    data.push({
      points: filteredPoints,
      fnType: "points",
      graphType: "polyline",
    });

    functionPlot({
      target: "#graph",
      xAxis: { domain: [0, 3] },
      yAxis: { domain: [-1.2 * 20, 1.2 * 20] },
      data: data,
      width: 900,
      height: 350,
      grid: true,
    });
    /*functionPlot({
      target: "#parabl",
      xAxis: { domain: [0, 3] },
      yAxis: { domain: [-1.2 * 20, 1.2 * 20] },
      data: [
        {
          points: [18, -45, -10, 60, 120, 143, 120, 60, -10, -45, 18].map(
            (val, ind) => [ind / plotCharacteristics.discr, val]
          ),
          fnType: "points",
          graphType: "polyline",
        },
      ],
    });*/
    drawPlots(filter, plotCharacteristics.width);
  }, [plotCharacteristics, signalData, filter]);

  return (
    <Stack direction="column" marginTop="15px">
      <Stack alignItems="center">
        <Stack direction="column" width="max-content" spacing={2}>
          <Tabs
            value={waveType}
            onChange={(event: React.SyntheticEvent, newValue: SignalType) => {
              console.log(newValue);
              setWaveType(newValue);
            }}
          >
            {WaveOptions.map((signal, index) => {
              return (
                <Tab value={signal.value} label={signal.label} key={index} />
              );
            })}
          </Tabs>
          <Select
            className="basic-single"
            classNamePrefix="select"
            options={FilterOptions}
            onChange={(data) => {
              if (data) {
                setFilterType(data.value);
              }
            }}
            defaultValue={FilterOptions[0]}
          />
        </Stack>
      </Stack>
      <Stack direction="row">
        <Stack
          direction="column"
          alignItems="flex-start"
          marginLeft={5}
          overflow="auto"
          height="90vh"
        >
          <Stack>
            <FilterComponent
              points={plotCharacteristics.points}
              updateFilter={setFilter}
            />
            <SignalComponent
              updateDataForPlot={setSignalData}
              updatePlotCharacteristics={setPlorCharacteristics}
            />
          </Stack>
        </Stack>
        <Stack direction="column">
          <div className="graph" id="parabl"></div>
          <Typography style={{ fontSize: "18px" }}>Signal</Typography>
          <div className="graph" id="graph"></div>
          <Typography style={{ fontSize: "18px" }}>
            Amplitude spectrum before filtering
          </Typography>
          <div className="graph" id="amplPrev"></div>
          <Typography style={{ fontSize: "18px" }}>
            Amplitude spectrum after filtering
          </Typography>
          <div className="graph" id="ampl"></div>
          <Typography style={{ fontSize: "18px" }}>
            Phases spectrum before filtering
          </Typography>
          <div className="graph" id="phasePrev"></div>
          <Typography style={{ fontSize: "18px" }}>
            Phases spectrum after filtering
          </Typography>
          <div className="graph" id="phase"></div>
          <div className="graph" id="koeffs"></div>
        </Stack>
      </Stack>
    </Stack>
  );
};
