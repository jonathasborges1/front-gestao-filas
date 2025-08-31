import { Box, Stack, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";

import { CallStatus, type RecentCall } from "@modules/queue/model/RecentCall";

import { StatusColor, StatusLabel } from "../../types/status-label";

const SIZE_ICON_DEFAULT = 60;

export default function LastCallItem({ item }: { item: RecentCall }) {
  const isFinished = item.status === CallStatus.FINISHED;

  return (
    <Stack
      direction="row"
      spacing={1.25}
      alignItems="center"
      sx={{
        p: 1.25,
        borderRadius: 2,
        bgcolor: "background.paper",
        boxShadow: "0 8px 4px rgba(16,24,40,.06)",
      }}
    >
      {isFinished ? (
        <CheckCircleRoundedIcon
          sx={{ color: StatusColor[item.status], fontSize: SIZE_ICON_DEFAULT }}
        />
      ) : (
        <AutorenewRoundedIcon
          sx={{ color: StatusColor[item.status], fontSize: SIZE_ICON_DEFAULT }}
        />
      )}

      <Box sx={{ minWidth: 0, border: "0px solid red" }}>
        <Typography variant="body2" sx={{ fontWeight: 700 }} noWrap>
          {item.driverName}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {item.plate.toUpperCase()}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: StatusColor[item.status],
          }}
        >
          {StatusLabel[item.status]}
        </Typography>
      </Box>
    </Stack>
  );
}
