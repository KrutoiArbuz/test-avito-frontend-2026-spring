import { Button, Popover, Stack, Typography } from '@mui/material';

import { colors } from '@/config/theme';

type AIResultPopoverProps = {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  result: string;
  error?: boolean;
  onApply?: () => void;
};

export const AIResultPopover = ({
  anchorEl,
  onClose,
  result,
  error = false,
  onApply,
}: AIResultPopoverProps) => {
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      slotProps={{
        paper: {
          sx: {
            p: 1,
            maxWidth: 332,
            borderRadius: 1,
            backgroundColor: error ? colors.dangerBg : colors.bgPage,
            boxShadow: colors.shadowPopup,
          },
        },
      }}
    >
      <Stack gap={1}>
        {error ? (
          <>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 12,
                color: 'error.dark',
              }}
            >
              Произошла ошибка при запросе к AI
            </Typography>
            <Typography sx={{ fontSize: 12, color: colors.textPrimary }}>
              Попробуйте повторить запрос или закройте уведомление
            </Typography>
          </>
        ) : (
          <>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 12,
              }}
            >
              Ответ AI:
            </Typography>
            <Typography
              sx={{ fontSize: 12, color: colors.textDark, whiteSpace: 'pre-wrap', lineHeight: 1.5 }}
            >
              {result}
            </Typography>
          </>
        )}

        <Stack direction="row" gap={1.2}>
          {!error && onApply && (
            <Button
              variant="contained"
              size="small"
              onClick={onApply}
              sx={{
                backgroundColor: colors.primary,
                color: colors.textInverse,
                textTransform: 'none',
                borderRadius: 1,
                fontSize: 14,
                px: 1,
                py: 0,
                fontWeight: 400,
              }}
            >
              Применить
            </Button>
          )}
          <Button
            variant="outlined"
            size="small"
            onClick={onClose}
            sx={{
              borderColor: colors.divider,
              borderRadius: 1,
              backgroundColor: error ? colors.dangerBorder : colors.bgPage,
              color: colors.textDark,
              textTransform: 'none',
              fontSize: 14,
              px: 1,
              py: 0,
              fontWeight: 400,
            }}
          >
            Закрыть
          </Button>
        </Stack>
      </Stack>
    </Popover>
  );
};
