import FilterListIcon from '@mui/icons-material/FilterList';
import { Box, Button, CircularProgress, Container, Drawer, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useItemsQuery } from '@/hooks/useItemsQuery';
import { PAGE_SIZE, useAdsStore } from '@/stores/adsStore';
import { parseSortParams } from '@/utils/parseSortParams';

import FiltersPanel from './components/FiltersPanel';
import PageHeader from './components/PageHeader';
import Pagination from './components/Pagination';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';

const ADS_PLURAL: [string, string, string] = ['объявление', 'объявления', 'объявлений'];

const AdsListPage = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    search,
    sort,
    selectedCategories,
    filterNeedsRevision,
    layout,
    page,
    setSearch,
    setSort,
    setLayout,
    setSelectedCategories,
    setFilterNeedsRevision,
    setPage,
    resetFilters,
  } = useAdsStore();

  const pageSize = PAGE_SIZE[layout];
  const { sortColumn, sortDirection } = parseSortParams(sort);

  const { data, isLoading, isError } = useItemsQuery({
    q: search.trim() || undefined,
    limit: pageSize,
    skip: (page - 1) * pageSize,
    needsRevision: filterNeedsRevision || undefined,
    categories: selectedCategories.length > 0 ? selectedCategories.join(',') : undefined,
    sortColumn,
    sortDirection,
  });

  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const pageCount = Math.ceil(total / pageSize);

  const filtersPanelProps = {
    selectedCategories,
    onCategoriesChange: setSelectedCategories,
    needsRevision: filterNeedsRevision,
    onNeedsRevisionChange: setFilterNeedsRevision,
    onReset: resetFilters,
  };

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ py: 1.5 }}>
        <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            <PageHeader count={total} pluralWords={ADS_PLURAL} />

            <Button
              variant="outlined"
              size="small"
              startIcon={<FilterListIcon />}
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { xs: 'flex', sm: 'none' } }}
            >
              Фильтры
            </Button>
          </Box>

          <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <SearchBar
              value={search}
              onChange={setSearch}
              layout={layout}
              onLayoutChange={setLayout}
              sortValue={sort}
              onSortChange={setSort}
            />

            <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
              <Box sx={{ display: { xs: 'none', sm: 'block' }, flexShrink: 0 }}>
                <FiltersPanel {...filtersPanelProps} />
              </Box>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                {isLoading ? (
                  <Box sx={{ py: 10, display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                  </Box>
                ) : isError ? (
                  <Box sx={{ py: 10, textAlign: 'center' }}>
                    <Typography color="error">Не удалось загрузить объявления</Typography>
                  </Box>
                ) : items.length === 0 ? (
                  <Box sx={{ py: 10, textAlign: 'center' }}>
                    <Typography color="text.secondary">
                      {search.trim()
                        ? `По запросу «${search}» ничего не найдено`
                        : 'Объявления не найдены'}
                    </Typography>
                  </Box>
                ) : (
                  <Grid container spacing={1.5}>
                    {items.map((item) => (
                      <Grid
                        key={item.id}
                        size={layout === 'grid' ? { xs: 12, sm: 6, md: 4, lg: 2.4 } : { xs: 12 }}
                      >
                        <ProductCard
                          category={item.category}
                          title={item.title}
                          price={item.price}
                          imageUrl={item.imageUrl}
                          needsRevision={item.needsRevision}
                          layout={layout}
                          onClick={() => navigate(`/ads/${item.id}`)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}

                {pageCount > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'flex-start', pt: 2 }}>
                    <Pagination count={pageCount} page={page} onChange={setPage} />
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ p: 2 }}>
          <FiltersPanel {...filtersPanelProps} />
        </Box>
      </Drawer>
    </Box>
  );
};

export default AdsListPage;
