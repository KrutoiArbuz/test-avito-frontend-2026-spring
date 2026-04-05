import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { Box, CardMedia } from '@mui/material';

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

export default CardImage;
