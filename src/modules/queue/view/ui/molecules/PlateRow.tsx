import { Box, Stack, Typography } from "@mui/material";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
export default function PlateRow({ plate }: { plate?: string }) {
  return (
    <Stack direction="row" spacing={1.25} alignItems="center">
      <CreditCardRoundedIcon sx={{ color: "text.secondary", fontSize: 100 }} />
      <Box
        sx={{
          p: 2,
          borderRadius: 10,
          bgcolor: "#FFF",
        }}
      >
        <Typography variant={"h4"} sx={{ fontWeight: 700, letterSpacing: 1.5 }}>
          {plate?.toUpperCase() ?? "— — — —"}
        </Typography>
      </Box>
    </Stack>
  );
}
