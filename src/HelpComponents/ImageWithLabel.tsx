import { Typography } from "@mui/material";
import { Ref } from "react";

interface ImageWithLabelProps {
  innerRef: Ref<HTMLImageElement>;
  label: string;
}

export const ImageWithLabel = ({ innerRef, label }: ImageWithLabelProps) => {
  return (
    <>
      <Typography style={{ fontSize: "18px" }}>{label}</Typography>
      <img key="root-image" ref={innerRef} />
    </>
  );
};
