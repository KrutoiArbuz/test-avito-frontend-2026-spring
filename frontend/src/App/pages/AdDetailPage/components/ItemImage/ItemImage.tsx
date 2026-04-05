import { Box } from '@mui/material';

import CardImage from '@/components/CardImage';

type ItemImageProps = {
  imageUrls?: string[];
  imageUrl?: string;
  title: string;
};

const ItemImage = ({ imageUrls, imageUrl, title }: ItemImageProps) => {
  const images = imageUrls && imageUrls.length > 0 ? imageUrls : imageUrl ? [imageUrl] : [];

  if (images.length === 0) {
    return (
      <Box sx={{ position: 'relative', flexShrink: 0 }}>
        <Box
          sx={{
            borderRadius: 1,
            overflow: 'hidden',
            aspectRatio: '4/3',
            backgroundColor: '#f0f0f0',
          }}
        >
          <CardImage imageUrl={undefined} title={title} />
        </Box>
      </Box>
    );
  }

  if (images.length === 1) {
    return (
      <Box sx={{ position: 'relative', flexShrink: 0 }}>
        <Box sx={{ borderRadius: 1, overflow: 'hidden', aspectRatio: '4/3' }}>
          <CardImage imageUrl={images[0]} title={title} />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{ position: 'relative', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Box sx={{ borderRadius: 1, overflow: 'hidden', aspectRatio: '4/3' }}>
        <CardImage imageUrl={images[0]} title={title} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 1.5,
          overflowX: 'auto',
          pb: 1,
          '&::-webkit-scrollbar': {
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
            borderRadius: 1,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: 1,
            '&:hover': {
              backgroundColor: '#555',
            },
          },
        }}
      >
        {images.slice(1).map((imgUrl, idx) => (
          <Box
            key={idx}
            sx={{
              flexShrink: 0,
              borderRadius: 1,
              overflow: 'hidden',
              width: 76,
              height: 76,
            }}
          >
            <CardImage imageUrl={imgUrl} title={`${title} ${idx + 2}`} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ItemImage;
