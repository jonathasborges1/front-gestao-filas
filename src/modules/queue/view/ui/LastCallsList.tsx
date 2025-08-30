import { Card, CardContent, Stack, Typography } from "@mui/material";
import type { RecentCall } from "../../model/RecentCall";
import LastCallItem from "./LastCallItem";

export default function LastCallsList({ items }: { items: RecentCall[] }) {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: "0 6px 24px rgba(16,24,40,.06)" }}>
      <CardContent sx={{ p: 2.5 }}>
        <Typography
          sx={{
            textTransform: "uppercase",
            fontSize: 20,
            fontWeight: 800,
            mb: 1,
          }}
        >
          Últimos chamados
        </Typography>
        <Stack spacing={1.25}>
          {items.slice(0, 4).map((it, i) => (
            <LastCallItem key={i} item={it} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
