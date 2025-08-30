import { Stack, Typography } from "@mui/material";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
export default function DriverRow({ name }: { name?: string }) {
  return (
    <Stack direction="row" spacing={1.25} alignItems="center">
      <PersonOutlineRoundedIcon sx={{ color: "text.secondary" }} />
      <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
        {name ?? "Aguardando próximo..."}
      </Typography>
    </Stack>
  );
}
