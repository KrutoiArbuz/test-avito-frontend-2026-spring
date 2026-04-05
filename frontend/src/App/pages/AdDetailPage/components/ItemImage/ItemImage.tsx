import { Box } from '@mui/material';

import CardImage from '@/components/CardImage';

type ItemImageProps = {
  imageUrl?: string;
  title: string;
};

const ItemImage = ({ imageUrl, title }: ItemImageProps) => (
  <Box sx={{ position: 'relative', flexShrink: 0 }}>
    <Box sx={{ borderRadius: 1, overflow: 'hidden', aspectRatio: '4/3' }}>
      <CardImage imageUrl={imageUrl} title={title} />
    </Box>
  </Box>
);

export default ItemImage;
