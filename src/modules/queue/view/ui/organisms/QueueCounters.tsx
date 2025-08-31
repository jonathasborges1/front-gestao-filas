import { Card, CardContent, Stack, Typography, Box } from "@mui/material";

export default function QueueCounters({
  totals,
}: {
  totals: { waitingLoading: number; inLoading: number; finished: number };
}) {
  const Dot = ({ bg, value }: { bg: string; value: number }) => (
    <Box
      sx={{
        width: 50,
        height: 50,
        borderRadius: "50%",
        bgcolor: bg,
        color: "background.default",
        display: "grid",
        placeItems: "center",
        fontWeight: 800,
      }}
    >
      <Typography variant="body1">{value}</Typography>
    </Box>
  );

  const Row = ({
    label,
    color,
    value,
  }: {
    label: string;
    color: string;
    value: number;
  }) => (
    <Stack
      direction="row"
      spacing={1.25}
      alignItems="center"
      justifyContent="space-between"
      sx={{ border: "0px solid red", width: "550px" }}
    >
      <Typography variant="body1" sx={{ minWidth: 210, fontWeight: 600 }}>
        {label}
      </Typography>
      <Dot bg={color} value={value} />
    </Stack>
  );

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Row
          label="Aguard. carregamento:"
          color="neutral.red1"
          value={totals.waitingLoading}
        />
        <Row
          label="Em carregamento:"
          color="info.main"
          value={totals.inLoading}
        />
        <Row
          label="Finalizados:"
          color="success.main"
          value={totals.finished}
        />
      </CardContent>
    </Card>
  );
}
