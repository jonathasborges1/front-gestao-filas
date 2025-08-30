import { Container, Grid } from "@mui/material";

import { useQueueDisplayVM } from "../viewmodel/useQueueDisplayVM";
import LastCallsList from "./ui/LastCallsList";
import QueueCounters from "./ui/QueueCounters";
import CallPanel from "./ui/CallPanel";
import HeaderBar from "./ui/HeaderBar";

export default function DisplayPage() {
  const endpoint = import.meta.env.VITE_REALTIME_URL as string;
  const vm = useQueueDisplayVM(endpoint);

  return (
    <>
      <HeaderBar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
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
