import { Stack, Typography, Box } from "@mui/material";
// import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import NotificationsActiveRounded from "@mui/icons-material/NotificationsActiveRounded";

export function SectionTitle({ children }: { children: string }) {
  return (
    <Stack alignItems="center" spacing={1} sx={{ mb: 1 }}>
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          bgcolor: "#FFE4E6",
          color: "error.main",
        }}
      >
        <NotificationsActiveRounded fontSize="small" />
      </Box>
      <Typography
        variant="h1"
        sx={{
          textTransform: "uppercase",
          fontWeight: 800,
          letterSpacing: 1,
          textAlign: "center",
        }}
      >
        {children}
      </Typography>
    </Stack>
  );
}
