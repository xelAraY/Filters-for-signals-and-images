import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import functionPlot, { FunctionPlotOptions } from "function-plot";
import { RepresentationOptions, RepresentationType } from "./types/types";
import { Signal } from "./MainComponents/Signal";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import { Image } from "./MainComponents/Image";

const getReprComponent = (reprType: RepresentationType): React.FC<{}> => {
  switch (reprType) {
    case "signal":
      return Signal;
    case "image":
      return Image;
    default:
      return () => <></>;
  }
};

const App: React.FC = () => {
  const [reprType, setReprType] = useState<RepresentationType>("signal");

  const ReprComponent = getReprComponent(reprType);

  return (
    <div className="App">
      <Stack alignItems="center">
        <Tabs
          value={reprType}
          onChange={(
            event: React.SyntheticEvent,
            newValue: RepresentationType
          ) => {
            console.log(newValue);
            setReprType(newValue);
          }}
        >
          {RepresentationOptions.map((repr, index) => {
            return <Tab value={repr.value} label={repr.label} key={index} />;
          })}
        </Tabs>
      </Stack>
      <ReprComponent />
    </div>
  );
};

export default App;
