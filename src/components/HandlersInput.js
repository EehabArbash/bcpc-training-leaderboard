import { useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
export default function HandlersInput({ loading, setHandlers = () => {} }) {
  const [textHandlers, setTextHandlers] = useState("");

  const onSubmit = () => {
    setHandlers(
      textHandlers
        .replaceAll("https://codeforces.com/profile/", "")
        .split("\n")
        .filter((handle) => handle !== "")
    );
  };
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      direction={"column"}
      alignItems="center"
      style={{ margin: "1rem" }}
    >
      <TextareaAutosize
      value={textHandlers}
        onChange={({ target }) => setTextHandlers(target.value)}
        aria-label="minimum height"
        minRows={4}
        placeholder="Enter Handlers Here Separated By newline"
        style={{
          padding: "1rem",
          margin: "1rem auto",
          minWidth: "70%",
          maxWidth: "70%",
          minHeight: 100,
          maxHeight: 200,
          overflow: "auto",
        }}
      />
      <Button disabled={loading} onClick={onSubmit} variant="contained">
        Submit
      </Button>
    </Grid>
  );
}
