import { Stack, Typography } from "@mui/material";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
export default function DriverRow({ name }: { name?: string }) {
  return (
    <Stack direction="row" spacing={1.25} alignItems="center">
      <PersonOutlineRoundedIcon
        sx={{ color: "text.secondary", fontSize: 100 }}
      />
      <Typography variant="h3" sx={{ fontWeight: 600 }}>
        {name ?? "Aguardando próximo..."}
      </Typography>
    </Stack>
  );
}
