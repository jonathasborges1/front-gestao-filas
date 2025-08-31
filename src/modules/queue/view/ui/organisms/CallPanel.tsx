import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";

import { SectionTitle } from "../molecules/SectionTitle";
import CallNumber from "../molecules/CallNumber";
import DriverRow from "../molecules/DriverRow";
import PlateRow from "../molecules/PlateRow";

import type { CurrentCall } from "@modules/queue/model/Broadcast";
import { TimestampBar } from "../atoms/TimestampBar";

export default function CallPanel({
  currentCall,
  now = new Date(),
}: {
  currentCall: CurrentCall | null;
  now?: Date;
}) {
  return (
    <>
      <SectionTitle>Chamada para carregamento</SectionTitle>
      <Card
        sx={{ borderRadius: 2, boxShadow: "0 6px 24px rgba(16,24,40,.06)" }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack spacing={1.5}>
            {currentCall ? (
              <>
                <CallNumber value={currentCall.scheduleNumber} />
                <DriverRow name={currentCall.driverName} />
                <Divider
                  sx={{ borderColor: "#E5E7EB", borderBottomWidth: 5 }}
                />
                <PlateRow plate={currentCall.plate} />
              </>
            ) : (
              <Typography>Nenhuma chamada no momento</Typography>
            )}
          </Stack>
        </CardContent>
      </Card>

      {currentCall && (
        <Card
          sx={{
            mt: 2,
            borderRadius: 2,
            boxShadow: "0 6px 24px rgba(16,24,40,.06)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, textTransform: "uppercase" }}
            >
              Dirija-se à portaria
            </Typography>
            <Typography variant="h6" sx={{ color: "text.secondary", mt: 0.5 }}>
              Apresente-se com as ordens para carregamento
            </Typography>
          </CardContent>
        </Card>
      )}

      <TimestampBar
        value={currentCall?.calledAt ? new Date(currentCall.calledAt) : now}
      />
    </>
  );
}
