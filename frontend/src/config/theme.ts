import { createTheme, responsiveFontSizes } from '@mui/material';

declare module '@mui/material/styles' {
  interface TypeBackground {
    stroke: string;
    search: string;
  }
}

export const colors = {
  primary: '#1890FF',
  primaryDark: '#40A9FF',
  primaryDeep: '#096DD9',
  primaryBg: '#E6F7FF',

  warning: '#FAAD14',
  warningDark: '#FFA940',
  warningBg: '#F9F1E6',

  error: '#C00F0C',
  errorBg: '#FEE9E7',
  errorCloseBtn: '#FCB3AD',
  danger: '#FF4D4F',
  dangerBg: '#FFF1F0',
  dangerBorder: '#FFCCC7',

  success: '#52C41A',
  successDark: '#389E0D',
  successBg: '#F6FFED',
  successBorder: '#B7EB8F',

  bgCanvas: '#F7F5F8',
  bgPage: '#FFFFFF',
  bgStroke: '#F0F0F0',
  bgSearch: '#F6F6F8',
  bgField: '#F4F4F6',
  bgImage: '#FAFAFA',
  bgLight: '#F3F3F3',

  textPrimary: '#000000',
  textDark: '#1E1E1E',
  textSecondary: '#757575',
  textMuted: '#848388',
  textPlaceholder: '#707176',
  textInverse: '#FFFFFF',
  textDisabled: 'rgba(0,0,0,0.25)',

  divider: '#D9D9D9',
  toggleOff: '#BFBFBF',
  cancelText: '#5A5A5A',

  shadowPanel: '0 4px 24px 0 rgba(0,0,0,.12), 0 1px 3px 0 rgba(0,0,0,.05)',
  shadowPopup:
    '0 9px 28px 8px rgba(0,0,0,.05), 0 6px 16px 0 rgba(0,0,0,.08), 0 3px 6px -4px rgba(0,0,0,.12)',
  shadowHover: '0 2px 8px 0 rgba(0,0,0,.15)',
  shadowBtn: '0 2px 0 0 rgba(0,0,0,.02)',
  shadowWindow: '0 25px 30px 0 rgba(0,0,0,.35), 0 0 20px 0 rgba(0,0,0,.15)',
};

export const neutral = {
  1: '#FFFFFF',
  2: '#FAFAFA',
  3: '#F5F5F5',
  4: '#F0F0F0',
  5: '#D9D9D9',
  6: '#BFBFBF',
  7: '#8C8C8C',
  8: '#595959',
  9: '#434343',
  10: '#262626',
  11: '#1F1F1F',
  12: '#141414',
  13: '#000000',
} as const;

const baseTheme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: colors.primary,
      dark: colors.primaryDark,
      contrastText: colors.textInverse,
    },
    warning: {
      main: colors.warning,
      light: colors.warningBg,
      dark: colors.warningDark,
      contrastText: colors.textInverse,
    },
    error: {
      main: colors.danger,
      light: colors.dangerBg,
      dark: colors.error,
      contrastText: colors.textInverse,
    },
    success: {
      main: colors.success,
      light: colors.successBg,
      dark: colors.successDark,
      contrastText: colors.textInverse,
    },
    background: {
      default: colors.bgCanvas,
      paper: colors.bgPage,
      stroke: colors.bgStroke,
      search: colors.bgSearch,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
      disabled: colors.textDisabled,
    },
    divider: colors.divider,
    grey: {
      100: neutral[3],
      200: neutral[4],
      300: neutral[5],
      400: neutral[6],
      500: neutral[7],
      600: neutral[8],
      700: neutral[9],
      800: neutral[10],
      900: neutral[11],
    },
  },

  shape: { borderRadius: 8 },

  typography: {
    fontFamily: '"Roboto", "Inter", "Helvetica", "Arial", sans-serif',
    button: { textTransform: 'none', fontWeight: 600 },

    h4: { fontSize: 30, fontWeight: 500, lineHeight: 1.33 },
    h5: { fontSize: 22, fontWeight: 500, lineHeight: 1.27 },
    h6: { fontSize: 18, fontWeight: 600, lineHeight: 1.22 },
    subtitle1: { fontSize: 16, fontWeight: 500, lineHeight: 1.5 },
    subtitle2: { fontSize: 14, fontWeight: 500, lineHeight: 1.57 },
    body1: { fontSize: 15, fontWeight: 400, lineHeight: 1.46 },
    body2: { fontSize: 14, fontWeight: 400, lineHeight: 1.57 },
    caption: { fontSize: 13, fontWeight: 400, lineHeight: 1.23 },
  },

  components: {
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: `1px solid ${colors.bgStroke}`,
          transition: 'box-shadow 0.2s ease',
          '&:hover': { boxShadow: colors.shadowHover },
        },
      },
    },

    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { borderRadius: 8 } },
    },

    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 8, paddingInline: 16 },
        contained: { boxShadow: colors.shadowBtn },
        outlined: { borderColor: colors.divider },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 6 },
        outlined: {
          borderColor: colors.divider,
          color: colors.textSecondary,
        },
        colorWarning: {
          backgroundColor: colors.warningBg,
          color: colors.warning,
          borderRadius: 100,
          border: 'none',
        },
        colorSuccess: {
          backgroundColor: colors.successBg,
          color: colors.success,
          border: `1px solid ${colors.successBorder}`,
        },
        colorError: {
          backgroundColor: colors.dangerBg,
          color: colors.danger,
          border: `1px solid ${colors.dangerBorder}`,
        },
      },
    },

    MuiTextField: {
      defaultProps: { variant: 'outlined', size: 'small' },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.divider,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.primaryDark,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.primary,
          },
          '& input::placeholder, & textarea::placeholder': {
            color: colors.textPlaceholder,
            opacity: 1,
          },
        },
      },
    },

    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-switchBase:not(.Mui-checked) + .MuiSwitch-track': {
            backgroundColor: colors.toggleOff,
            opacity: 1,
          },
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 8 },
        standardWarning: {
          backgroundColor: colors.warningBg,
          color: neutral[10],
          '& .MuiAlert-icon': { color: colors.warning },
        },
        standardError: {
          backgroundColor: colors.errorBg,
          color: colors.error,
          '& .MuiAlert-icon': { color: colors.error },
          '& .MuiAlert-action .MuiIconButton-root': {
            color: colors.errorCloseBtn,
          },
        },
        standardSuccess: {
          backgroundColor: colors.successBg,
          color: colors.successDark,
          '& .MuiAlert-icon': { color: colors.success },
        },
        standardInfo: {
          backgroundColor: colors.primaryBg,
          color: colors.primaryDeep,
          '& .MuiAlert-icon': { color: colors.primary },
        },
      },
    },

    MuiPaginationItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px',
          border: `1px solid ${colors.divider}`,
          '&.Mui-selected': {
            border: `1px solid ${colors.primary}`,
            color: colors.primary,
            backgroundColor: colors.bgPage,
            fontWeight: 700,
            '&:hover': { backgroundColor: colors.bgSearch },
          },
        },
      },
    },

    MuiSnackbar: {
      defaultProps: {
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        autoHideDuration: 4000,
      },
    },
  },
});

export const theme = responsiveFontSizes(baseTheme);
