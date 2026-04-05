import { ArrowBack } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { useItemQuery } from '@/hooks/queries/useItemQuery';
import { useItemEditDate } from '@/hooks/useItemEditDate';

import ItemHeader from './components/ItemHeader';
import ItemImage from './components/ItemImage';
import ItemParams from './components/ItemParams';
import ItemRevisionBanner from './components/ItemRevisionBanner';

const AdDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: item, isLoading, isError } = useItemQuery(id || '');
  const { editDate } = useItemEditDate(id || '');

  return (
    <Box sx={{ backgroundColor: 'background.paper', minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button
            onClick={() => navigate('/ads')}
            sx={{ color: '#000', display: 'flex', m: 0, px: 0, py: 1, pr: 1.5 }}
          >
            <ArrowBack sx={{ marginLeft: 0, marginRight: 1 }} />
            <Typography variant="h3">Объявление</Typography>
          </Button>
        </Box>

        {isLoading ? (
          <Box sx={{ py: 10, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : isError || !id ? (
          <Box sx={{ py: 10, textAlign: 'center' }}>
            <Typography variant="h5" color="error">
              {!id ? 'ID объявления не указан' : 'Произошла ошибка при загрузке объявления'}
            </Typography>
          </Box>
        ) : !item ? (
          <Box sx={{ py: 10, textAlign: 'center' }}>
            <Typography variant="h5" color="text.secondary">
              Объявление не найдено
            </Typography>
          </Box>
        ) : (
          <>
            <ItemHeader
              title={item.title}
              price={item.price}
              createdAt={item.createdAt}
              editAt={editDate || undefined}
              onEdit={() => navigate(`/ads/${id}/edit`)}
            />

            <Divider sx={{ height: 1, backgroundColor: 'color.divider', my: 4 }} />

            <Stack direction={{ xs: 'column', md: 'row' }} gap={6} alignItems="flex-start">
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  maxWidth: { xs: '100%', md: 480 },
                }}
              >
                <ItemImage imageUrl={item.imageUrl} title={item.title} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography variant="h3">Описание</Typography>
                  {item.description ? (
                    <Typography variant="caption">{item.description}</Typography>
                  ) : (
                    <Typography variant="caption">Отсутствует</Typography>
                  )}
                </Box>
              </Box>

              <Box
                sx={{
                  width: { xs: '100%', md: 527 },
                  maxWidth: { md: 527 },
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4.5,
                }}
              >
                {item.needsRevision && item.missingFields.length > 0 && (
                  <ItemRevisionBanner missingFields={item.missingFields} />
                )}
                <ItemParams category={item.category} params={item.params} />
              </Box>
            </Stack>
          </>
        )}
      </Container>
    </Box>
  );
};

export default AdDetailPage;
