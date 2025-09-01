import { Card, CardContent } from "@mui/material";
import { CallStatus, type TotalCall } from "@modules/queue/model/Broadcast";
import { toCamelCase } from "@modules/queue/model/helper";

import QueueCounterItem from "../molecules/QueueCounterItem";
const { WAITING, IN_PROGRESS, FINISHED } = CallStatus;

const COUNTERS: Array<{ key: CallStatus; label: string; color: string }> = [
  { key: WAITING, label: "Aguard. carregamento:", color: "neutral.red1" },
  { key: IN_PROGRESS, label: "Em carregamento:", color: "info.main" },
  { key: FINISHED, label: "Finalizados:", color: "success.main" },
];

type Props = { totals: TotalCall };
export default function QueueCounters({ totals }: Props) {
  return (
    <Card sx={{ mt: 2 }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {COUNTERS.map(({ key, label, color }) => {
          return (
            <QueueCounterItem
              key={key}
              label={label}
              color={color}
              value={totals[toCamelCase(key)]}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}
