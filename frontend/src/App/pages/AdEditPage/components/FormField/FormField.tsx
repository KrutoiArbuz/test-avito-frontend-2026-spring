import ClearIcon from '@mui/icons-material/Clear';
import { Box, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';

import { colors } from '@/config/theme';

type FormFieldProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  type?: string;
  placeholder?: string;
  error?: boolean;
  touched?: boolean;
  endAdornment?: React.ReactNode;
  onClear?: () => void;
  bold?: boolean;
};

export const FormField = ({
  label,
  value,
  onChange,
  required = false,
  multiline = false,
  rows = 1,
  type = 'text',
  placeholder,
  error = false,
  touched = false,
  endAdornment,
  onClear,
  bold = false,
}: FormFieldProps) => {
  const isEmpty = !value.trim();
  const isWarning = !required && isEmpty && touched;
  const borderColor = error ? colors.danger : isWarning ? colors.warning : colors.divider;
  const bgColor = error ? colors.dangerBg : isWarning ? colors.warningBg : colors.bgPage;
  const fontWeight = bold ? '600' : '400';
  const isLargeDescription = multiline && rows === 4;
  const containerSx = isLargeDescription ? { maxWidth: 942, flex: 1 } : { maxWidth: 456, flex: 1 };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ...containerSx }}>
      <Stack direction="row" spacing={0.5} alignItems="flex-start">
        {required && (
          <Typography sx={{ color: colors.danger, fontSize: 14, fontWeight }}>*</Typography>
        )}
        <Typography variant="subtitle2" sx={{ fontWeight }}>
          {label}
        </Typography>
      </Stack>

      <TextField
        fullWidth
        multiline={multiline}
        rows={multiline ? rows : 1}
        type={type}
        value={value}
        onChange={(e) => {
          if (multiline && e.target.value.length <= 1000) {
            onChange(e.target.value);
          } else if (!multiline) {
            onChange(e.target.value);
          }
        }}
        placeholder={placeholder}
        inputProps={multiline ? { maxLength: 1000 } : {}}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Stack direction="row" gap={0.5}>
                {value && onClear && (
                  <IconButton
                    size="small"
                    onClick={onClear}
                    edge="end"
                    sx={{ color: colors.textPlaceholder }}
                  >
                    <ClearIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                )}
                {endAdornment}
              </Stack>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 1,
            fontSize: 14,
            lineHeight: 1.57,
            fontFamily: 'inherit',
            backgroundColor: bgColor,
            transition: 'all 0.2s ease',

            '&:hover': {
              borderColor: colors.primaryDark,
            },
            '&.Mui-focused': {
              backgroundColor: bgColor,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.primary,
                borderWidth: '2px',
              },
            },
          },
          '& .MuiOutlinedInput-input': {
            padding: '6px 13px',
            lineHeight: 1.5,
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor,
            transition: 'border-color 0.2s ease',
          },
          '& .MuiOutlinedInput-input::placeholder': {
            color: colors.textPlaceholder,
            opacity: 1,
          },
        }}
      />
      {multiline && (
        <Typography
          sx={{ fontSize: 12, color: colors.textSecondary, textAlign: 'right', mt: -0.5 }}
        >
          {value.length} / 1000
        </Typography>
      )}
    </Box>
  );
};
