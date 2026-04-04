import CircleIcon from '@mui/icons-material/Circle';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, Typography } from '@mui/material';

import type { CategoryType } from '@/types/itemTypes';
import { getCategoryLabel } from '@/utils/normalizers';

type ProductCardProps = {
  category: CategoryType;
  title: string;
  price: number;
  imageUrl?: string;
  needsRevision: boolean;
  onClick?: () => void;
};

const ProductCard = ({
  category,
  title,
  price,
  imageUrl,
  needsRevision,
  onClick,
}: ProductCardProps) => (
  <Card
    sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <CardActionArea
      onClick={onClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        height: '100%',
      }}
    >
      <Box sx={{ position: 'relative', flexShrink: 0 }}>
        <Box
          sx={{
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          {imageUrl ? (
            <CardMedia
              component="img"
              image={imageUrl}
              alt={title}
              sx={{ aspectRatio: '4/3', objectFit: 'cover', display: 'block', width: '100%' }}
            />
          ) : (
            <Box
              sx={{
                aspectRatio: '4/3',
                backgroundColor: 'grey.100',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ImageOutlinedIcon sx={{ fontSize: 64, color: 'grey.400' }} />
            </Box>
          )}
        </Box>

        <Chip
          label={getCategoryLabel(category)}
          variant="outlined"
          size="small"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: (t) => t.spacing(1.5),
            transform: 'translateY(50%)',
            zIndex: 1,
            backgroundColor: 'background.paper',
          }}
        />
      </Box>

      <CardContent
        sx={{
          pt: 3,
          pb: '16px !important',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 0.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {title}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {price.toLocaleString('ru-RU')} ₽
        </Typography>

        {needsRevision && (
          <Chip
            icon={<CircleIcon sx={{ fontSize: '6px !important' }} />}
            label="Требует доработок"
            color="warning"
            size="small"
            sx={{ alignSelf: 'flex-start' }}
          />
        )}
      </CardContent>
    </CardActionArea>
  </Card>
);

export default ProductCard;
