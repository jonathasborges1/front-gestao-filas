import { Box, Typography } from "@mui/material";
import { formatDateTime } from "utils/date";

export function TimestampBar({ value }: { value: Date }) {
  return (
    <Box sx={{ py: 4, px: 1 }}>
      <Typography
        variant="h5"
        sx={{ color: "text.secondary", mt: 0.5, fontWeight: 600 }}
      >
        {formatDateTime(value)}
      </Typography>
    </Box>
  );
}
