import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Container, Divider, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import type { ItemApi } from '@/types/itemTypes';
import { normalizeItem } from '@/utils/normalizers';

import ItemHeader from './components/ItemHeader';
import ItemImage from './components/ItemImage';
import ItemParams from './components/ItemParams';
import ItemRevisionBanner from './components/ItemRevisionBanner';

const MOCK_ITEM: ItemApi = {
  id: '1',
  category: 'electronics',
  title: 'MacBook Pro 16"',
  price: 64000,
  description:
    'Продаю свой MacBook Pro 16" (2021) на чипе M1 Pro. Состояние отличное, работал бережно. Мощности хватает на всё: от сложного монтажа до кода, при этом ноутбук почти не греется.',
  params: {
    type: 'laptop',
    brand: 'Apple',
    model: 'M1 Pro',
  },
  createdAt: '2025-03-10T19:39:00Z',
  needsRevision: true,
  imageUrl: undefined,
};

const AdDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // TODO: const { data, isLoading, isError } = useItemQuery(id!);
  const item = normalizeItem(MOCK_ITEM);

  return (
    <Box sx={{ backgroundColor: 'background.paper', minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button
            onClick={() => navigate(-1)}
            sx={{ color: '#000', display: 'flex', m: 0, px: 0, py: 1, pr: 1.5 }}
          >
            <ArrowBack sx={{ marginLeft: 0, marginRight: 1 }} />
            <Typography variant="h3">Объявление</Typography>
          </Button>
        </Box>

        <ItemHeader
          title={item.title}
          price={item.price}
          createdAt={item.createdAt}
          editAt={'0'}
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
      </Container>
    </Box>
  );
};

export default AdDetailPage;
