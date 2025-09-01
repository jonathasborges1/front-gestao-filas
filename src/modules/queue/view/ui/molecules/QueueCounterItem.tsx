import { Stack, Typography } from "@mui/material";
import { Dot } from "../atoms/Dot";

type Props = { label: string; color: string; value: number };
export default function QueueCounterItem({ label, color, value }: Props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ width: "auto" }}
    >
      <Typography variant="body1" sx={{ minWidth: 210, fontWeight: 600 }}>
        {label}
      </Typography>
      <Dot bg={color} value={value} />
    </Stack>
  );
}
