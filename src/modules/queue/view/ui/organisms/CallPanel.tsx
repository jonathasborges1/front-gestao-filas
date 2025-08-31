import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { SectionTitle } from "../molecules/SectionTitle";
import CallNumber from "../molecules/CallNumber";
import DriverRow from "../molecules/DriverRow";
import PlateRow from "../molecules/PlateRow";

export default function CallPanel({
  currentCall,
}: {
  currentCall?: {
    scheduleNumber: string;
    driverName: string;
    plate: string;
    message: string;
    calledAt: string;
  };
}) {
  return (
    <>
      <SectionTitle>Chamada para carregamento</SectionTitle>
      <Card
        sx={{ borderRadius: 2, boxShadow: "0 6px 24px rgba(16,24,40,.06)" }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack spacing={1.5}>
            <CallNumber value={currentCall?.scheduleNumber} />
            <DriverRow name={currentCall?.driverName} />
            <Divider sx={{ borderColor: "#E5E7EB", borderBottomWidth: 5 }} />
            <PlateRow plate={currentCall?.plate} />
          </Stack>
        </CardContent>
      </Card>

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
      <Box sx={{ border: "0px solid red", py: 4, px: 1 }}>
        <Typography
          variant="h5"
          sx={{ color: "text.secondary", mt: 0.5, fontWeight: 600 }}
        >
          {currentCall
            ? new Date(currentCall.calledAt).toLocaleString("pt-BR", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""}
        </Typography>
      </Box>
    </>
  );
}
