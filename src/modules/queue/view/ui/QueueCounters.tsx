import { Card, CardContent, Stack, Typography, Box } from "@mui/material";

export default function QueueCounters({
  totals,
}: {
  totals: { waitingLoading: number; inLoading: number; finished: number };
}) {
  const Dot = ({ bg, value }: { bg: string; value: number }) => (
    <Box
      sx={{
        width: 24,
        height: 24,
        borderRadius: "50%",
        bgcolor: bg,
        color: "#fff",
        display: "grid",
        placeItems: "center",
        fontWeight: 800,
        fontSize: 14,
      }}
    >
      {value}
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
    <Stack direction="row" spacing={1.25} alignItems="center">
      <Typography variant="body1" sx={{ minWidth: 210 }}>
        {label}
      </Typography>
      <Dot bg={color} value={value} />
    </Stack>
  );
  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Row
          label="Aguard. carregamento:"
          color="#EF4444"
          value={totals.waitingLoading}
        />
        <Row label="Em carregamento" color="#0EA5E9" value={totals.inLoading} />
        <Row label="Finalizados" color="#22C55E" value={totals.finished} />
      </CardContent>
    </Card>
  );
}
