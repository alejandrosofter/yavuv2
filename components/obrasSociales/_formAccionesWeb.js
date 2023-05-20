import Grid from "@mui/material/Grid";

import SelectBoot from "@components/bootsweb/selectBootWeb";
export default function FormItem({ mod }) {
  return (
    <Grid container spacing={2}>
      <Grid item md={5}>
        <SelectBoot />{" "}
      </Grid>
    </Grid>
  );
}
