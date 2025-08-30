import { Box, Stack, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";

import type { RecentCall } from "../../model/RecentCall";

export default function LastCallItem({ item }: { item: RecentCall }) {
  return (
    <Stack
      direction="row"
      spacing={1.25}
      alignItems="center"
      sx={{
        p: 1.25,
        borderRadius: 2,
        bgcolor: "#FFF",
        boxShadow: "0 1px 4px rgba(16,24,40,.06)",
      }}
    >
      {item.status === "Finished" ? (
        <CheckCircleRoundedIcon sx={{ color: "success.main" }} />
      ) : (
        <AutorenewRoundedIcon sx={{ color: "info.main" }} />
      )}
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontWeight: 700 }} noWrap>
          {item.driverName}
        </Typography>
        <Typography sx={{ fontSize: 12, color: "text.secondary" }} noWrap>
          {item.plate.toUpperCase()}
        </Typography>
        <Typography
          sx={{
            fontSize: 12,
            color: item.status === "Finished" ? "success.main" : "info.main",
          }}
        >
          {item.status === "Finished" ? "Finalizado" : "Em Carregamento"}
        </Typography>
      </Box>
    </Stack>
  );
}
