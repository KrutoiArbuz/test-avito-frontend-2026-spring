import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import { Box, Stack, Typography } from '@mui/material';

type ItemRevisionBannerProps = {
  missingFields: string[];
};

const ItemRevisionBanner = ({ missingFields }: ItemRevisionBannerProps) => (
  <Box
    sx={{
      backgroundColor: 'warning.light',
      borderRadius: 1,
      px: 2,
      py: 1.5,
      display: 'flex',
      gap: 2,
      alignItems: 'flex-start',
      maxWidth: 512,
      boxShadow:
        '0 9px 28px 8px rgba(0,0,0,.05), 0 6px 16px 0 rgba(0,0,0,.08), 0 3px 6px -4px rgba(0,0,0,.12)',
    }}
  >
    <ErrorOutlinedIcon sx={{ fontSize: 18, mt: '1px', flexShrink: 0, color: 'warning.main' }} />
    <Stack direction="column" gap={0.5}>
      <Typography variant="subtitle2">Требуются доработки</Typography>
      <Typography variant="body1">У объявления не заполнены поля:</Typography>
      <ul style={{ margin: 0, padding: 0, paddingLeft: 24 }}>
        {missingFields.map((f) => (
          <li key={f}>
            <Typography variant="body1">{f}</Typography>
          </li>
        ))}
      </ul>
    </Stack>
  </Box>
);

export default ItemRevisionBanner;
