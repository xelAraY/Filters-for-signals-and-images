import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ChangeEvent, useEffect, useState } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface InputFileProps {
  updateFile: (file: File) => void;
}

export default function InputFileUpload({ updateFile }: InputFileProps) {
  const [file, setFile] = useState<File | undefined>();
  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (file) {
      updateFile(file);
    }
  }, [file]);
  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      Load Image
      <VisuallyHiddenInput
        type="file"
        accept="image/*"
        onChange={onFileChange}
      />
    </Button>
  );
}
