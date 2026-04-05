import { Box, Typography } from '@mui/material';

import { pluralFormatter, type PluralFormsType } from '@/utils/pluralFormatter';

type PageHeaderProps = {
  count: number;
  pluralWords: PluralFormsType;
};

const PageHeader = ({ count, pluralWords }: PageHeaderProps) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', py: 1.5, px: 1 }}>
    <Typography variant="h3">Мои объявления</Typography>
    <Typography variant="subtitle1" sx={{ fontSize: 18, color: 'text.secondary' }}>
      {pluralFormatter(count, pluralWords)}
    </Typography>
  </Box>
);

export default PageHeader;
