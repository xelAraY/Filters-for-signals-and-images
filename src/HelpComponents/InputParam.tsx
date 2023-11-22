import { Slider, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface InputParamProps {
  inputName: string;
  values?: {
    min?: number;
    max: number;
    step?: number;
  };
  onValueUpdate?: (value: number) => void;
}

export const InputParam = ({
  inputName,
  values,
  onValueUpdate,
}: InputParamProps) => {
  const [value, setValue] = useState(values?.min ?? 0);
  const [textValue, setTextValue] = useState(String(values?.min ?? 0));

  useEffect(() => {
    onValueUpdate?.(value);
  }, [value]);

  return (
    <>
      <Stack
        direction="column"
        alignItems="flex-start"
        spacing={1}
        marginTop={2}
        width="max-content"
        marginLeft={2}
      >
        <Typography style={{ fontSize: "18px" }}>{inputName}</Typography>
        <TextField
          value={textValue}
          variant="filled"
          onChange={(ev) => {
            const strValue = ev.target.value;
            console.log(strValue, "!");
            setTextValue(strValue);
            setValue(Number(strValue));
          }}
        />
        {values && (
          <Slider
            size="medium"
            min={values.min}
            max={values.max}
            step={values.step}
            value={value}
            onChange={(ev) => {
              setValue((ev as any).target.value);
              setTextValue(String((ev as any).target.value));
            }}
          />
        )}
      </Stack>
    </>
  );
};
