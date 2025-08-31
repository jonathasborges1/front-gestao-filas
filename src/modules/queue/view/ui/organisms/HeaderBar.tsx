import { Box, Grid } from "@mui/material";
import logo from "@assets/logo-atem.svg";

import type { RealtimeStatus } from "@modules/queue/model/realtime";
import ConnectionBadge from "../atoms/ConnectionBadge";

export default function HeaderBar({ status }: { status: RealtimeStatus }) {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        height: 72,
        display: "flex",
        alignItems: "center",
        px: 3,
      }}
    >
      <Grid container sx={{ pt: 5 }}>
        <Grid item xs={12}>
          <img src={logo} alt="Atem" height={80} />
        </Grid>
        <Grid item xs={12}>
          <ConnectionBadge status={status} />
        </Grid>
      </Grid>
    </Box>
  );
}
