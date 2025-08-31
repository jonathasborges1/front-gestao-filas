import { Stack, Typography, Box, Grid } from "@mui/material";
import NotificationsActiveRounded from "@mui/icons-material/NotificationsActiveRounded";

export function SectionTitle({ children }: { children: string }) {
  return (
    <Stack alignItems="center" spacing={1} sx={{ mb: 1 }}>
      <Grid container justifyContent={"center"}>
        <Grid item>
          <Box
            sx={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              bgcolor: "neutral.red",
              color: "background.default",
            }}
          >
            <NotificationsActiveRounded fontSize="large" />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{
              textTransform: "uppercase",
              fontWeight: 800,
              letterSpacing: 1,
              textAlign: "center",
            }}
          >
            {children}
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  );
}
