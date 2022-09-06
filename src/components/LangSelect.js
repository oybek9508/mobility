import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function LangSelect({ lang }) {
  //   const [age, setAge] = React.useState("");

  //   const handleChange = (event: SelectChangeEvent) => {
  //     setAge(event.target.value);
  //   };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        {/* <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel> */}
        <Select
          //   labelId="demo-simple-select-autowidth-label"
          //   id="demo-simple-select-autowidth"
          value={lang}
          //   onChange={handleChange}
          //   autoWidth
          //   label="Age"
        >
          <MenuItem value={10}>Twenty</MenuItem>
          <MenuItem value={21}>Twenty one</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
