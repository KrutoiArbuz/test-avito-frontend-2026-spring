import LightbulbOutlineIcon from '@mui/icons-material/LightbulbOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import { Button, CircularProgress, type SxProps, type Theme } from '@mui/material';

import { colors } from '@/config/theme';

type AIButtonProps = {
  isLoading: boolean;
  hasValue: boolean;
  hasResult: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'description' | 'price';
  sx?: SxProps<Theme>;
};

export const AIButton = ({
  isLoading,
  hasValue,
  hasResult,
  onClick,
  variant = 'description',
  sx,
}: AIButtonProps) => {
  const getButtonText = () => {
    if (isLoading) return 'Выполняется запрос';
    if (hasResult) return 'Повторить запрос';
    if (variant === 'price') return 'Узнать рыночную цену';
    return hasValue ? 'Улучшить описание' : 'Придумать описание';
  };

  const getIcon = () => {
    if (isLoading) return <CircularProgress size={14} color="warning" />;
    if (hasResult) return <ReplayIcon color="warning" sx={{ fontSize: '14px' }} />;
    return <LightbulbOutlineIcon color="warning" sx={{ fontSize: '14px' }} />;
  };

  return (
    <Button
      variant="contained"
      size="small"
      startIcon={getIcon()}
      disabled={isLoading}
      onClick={onClick}
      sx={{
        borderRadius: 1,
        px: 1.7,
        py: 0.75,
        gap: 0.5,
        textTransform: 'none',
        fontSize: 14,
        fontWeight: 400,
        backgroundColor: colors.warningBg,
        color: colors.warning,
        boxShadow: colors.shadowBtn,
        '&:hover': {
          backgroundColor: '#fae8cc',
          color: colors.warningDark,
        },
        '&.Mui-disabled': {
          backgroundColor: colors.warningBg,
          color: colors.warning,
        },
        ...sx,
      }}
    >
      {getButtonText()}
    </Button>
  );
};
