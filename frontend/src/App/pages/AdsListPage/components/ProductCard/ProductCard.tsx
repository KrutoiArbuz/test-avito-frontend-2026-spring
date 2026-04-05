import CircleIcon from '@mui/icons-material/Circle';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, Typography } from '@mui/material';

import type { CategoryType } from '@/types/itemTypes';
import type { LayoutType } from '@/types/layoutType';
import { getCategoryLabel } from '@/utils/normalizers';

type ProductCardProps = {
  category: CategoryType;
  title: string;
  price: number;
  imageUrl?: string;
  needsRevision: boolean;
  layout?: LayoutType;
  onClick?: () => void;
};

const CardImage = ({ imageUrl, title }: { imageUrl?: string; title: string }) =>
  imageUrl ? (
    <CardMedia
      component="img"
      image={imageUrl}
      alt={title}
      sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  ) : (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: 'grey.100',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ImageOutlinedIcon sx={{ fontSize: 48, color: 'grey.400' }} />
    </Box>
  );

const RevisionBadge = () => (
  <Chip
    icon={<CircleIcon sx={{ fontSize: '6px !important' }} />}
    label="Требует доработок"
    color="warning"
    size="small"
    sx={{ alignSelf: 'flex-start' }}
  />
);

const GridCard = ({
  category,
  title,
  price,
  imageUrl,
  needsRevision,
  onClick,
}: ProductCardProps) => (
  <Card sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
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
        <Box sx={{ borderRadius: 1, overflow: 'hidden', aspectRatio: '4/3' }}>
          <CardImage imageUrl={imageUrl} title={title} />
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

        {needsRevision && <RevisionBadge />}
      </CardContent>
    </CardActionArea>
  </Card>
);

const ListCard = ({
  category,
  title,
  price,
  imageUrl,
  needsRevision,
  onClick,
}: ProductCardProps) => (
  <Card sx={{ width: '100%' }}>
    <CardActionArea
      onClick={onClick}
      sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}
    >
      <Box
        sx={{
          width: 160,
          flexShrink: 0,
          borderRadius: 1,
          overflow: 'hidden',
          aspectRatio: '4/3',
        }}
      >
        <CardImage imageUrl={imageUrl} title={title} />
      </Box>

      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          py: 2,
          '&:last-child': { pb: 2 },
        }}
      >
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {getCategoryLabel(category)}
        </Typography>

        <Typography
          variant="h4"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {title}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 'auto' }}>
          {price.toLocaleString('ru-RU')} ₽
        </Typography>

        {needsRevision && <RevisionBadge />}
      </CardContent>
    </CardActionArea>
  </Card>
);

const ProductCard = (props: ProductCardProps) =>
  props.layout === 'list' ? <ListCard {...props} /> : <GridCard {...props} />;

export default ProductCard;
