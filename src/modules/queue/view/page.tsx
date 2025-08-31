import { Container, Grid } from "@mui/material";

import { useQueueDisplayVM } from "../viewmodel/useQueueDisplayVM";

import LastCallsList from "./ui/organisms/LastCallsList";
import QueueCounters from "./ui/organisms/QueueCounters";
import CallPanel from "./ui/organisms/CallPanel";
import HeaderBar from "./ui/organisms/HeaderBar";

export default function DisplayPage() {
  const { status, broadcastPayload: vm } = useQueueDisplayVM();
  return (
    <>
      <HeaderBar status={status} />
      <Container
        sx={{
          minWidth: "80%",
          py: 4,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <CallPanel currentCall={vm.currentCall} />
          </Grid>
          <Grid item xs={12} md={4}>
            <LastCallsList items={vm.recentCalls} />
            <QueueCounters totals={vm.totals} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
