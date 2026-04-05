import EditIcon from '@mui/icons-material/Edit';
import { Button, Stack, Typography } from '@mui/material';

type ItemHeaderProps = {
  title: string;
  price: number;
  createdAt: string;
  editAt: string;
  onEdit: () => void;
};

const ItemHeader = ({ title, price, createdAt, editAt, onEdit }: ItemHeaderProps) => {
  const fmt = (iso: string) =>
    new Date(iso).toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <Stack direction="column" gap={1.5}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems="left"
      >
        <Typography variant="h2">{title}</Typography>
        <Typography variant="h2">{price.toLocaleString('ru-RU')} ₽</Typography>
      </Stack>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        gap={2}
      >
        <Button
          variant="contained"
          size="small"
          endIcon={<EditIcon sx={{ fontSize: '18px !important' }} />}
          onClick={onEdit}
          sx={{ borderRadius: 1, px: 1.5, py: 1, gap: 1, textTransform: 'none', fontSize: 16 }}
        >
          Редактировать
        </Button>
        <Stack direction="column" gap={0.5} sx={{ textAlign: 'right' }}>
          <Typography variant="caption" color="textSecondary">
            Опубликовано: {fmt(createdAt)}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Отредактировано: {fmt(editAt)}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ItemHeader;
