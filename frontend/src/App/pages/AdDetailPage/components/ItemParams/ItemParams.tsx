import { Stack, Typography } from '@mui/material';

import type { CategoryType, ItemModel } from '@/types/itemTypes';

import { getParamsRows } from './constants';

type ItemParamsProps = {
  category: CategoryType;
  params: ItemModel['params'];
};

const ItemParams = ({ category, params }: ItemParamsProps) => {
  const rows = getParamsRows(category, params);
  const filled = rows.filter((r) => r.value != null);
  if (filled.length === 0) return null;

  return (
    <Stack gap={2}>
      <Typography variant="h3">Характеристики</Typography>
      <Stack spacing={0.75}>
        {filled.map((r) => (
          <Stack key={r.label} direction="row" spacing={2}>
            <Typography variant="subtitle2" color="textSecondary" minWidth={148}>
              {r.label}
            </Typography>
            <Typography variant="caption" color="textPrimary">
              {r.value}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default ItemParams;
