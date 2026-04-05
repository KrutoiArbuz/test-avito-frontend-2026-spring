import { Box, FormControl, MenuItem, Select, Stack, Typography } from '@mui/material';

import { colors } from '@/config/theme';

type FormSelectProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
  required?: boolean;
  touched?: boolean;
  error?: boolean;
  bold?: boolean;
};

export const FormSelect = ({
  label,
  value,
  onChange,
  options,
  required = false,
  touched = false,
  error = false,
  bold = false,
}: FormSelectProps) => {
  const isEmpty = !value || value === '';
  const isWarning = !required && isEmpty && touched;
  const borderColor = error ? colors.danger : isWarning ? colors.warning : colors.divider;
  const bgColor = colors.bgPage;
  const fontWeight = bold ? '400' : '600';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxWidth: 456, flex: 1 }}>
      <Stack direction="row" spacing={0.5} alignItems="flex-start">
        {required && (
          <Typography sx={{ color: colors.danger, fontSize: 14, fontWeight }}>*</Typography>
        )}
        <Typography variant="subtitle2" sx={{ fontWeight: fontWeight }}>
          {label}
        </Typography>
      </Stack>

      <FormControl sx={{ maxWidth: 456, flex: 1 }}>
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          sx={{
            borderRadius: 1,
            fontSize: 14,
            lineHeight: 1.57,
            fontFamily: 'inherit',
            backgroundColor: bgColor,
            transition: 'all 0.2s ease',

            '& .MuiOutlinedInput-root': {
              '&:hover .MuiOutlinedInput-notchedOutline': {
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
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor,
              transition: 'border-color 0.2s ease',
            },
            '& .MuiOutlinedInput-input': {
              padding: '6px 13px',
              lineHeight: 1.5,
            },
          }}
        >
          <MenuItem value="">
            <em>Выберите опцию</em>
          </MenuItem>
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
