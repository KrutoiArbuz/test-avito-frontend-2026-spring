import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';

import { colors } from '@/config/theme';
import type { ItemUpdateInApi } from '@/types/itemTypes';

import { useAdEditForm } from '../../hooks/useAdEditForm';
import { AIButton } from '../AIButton';
import { AIResultPopover } from '../AIResultPopover';
import { CategoryFields } from '../CategoryFields';
import { FormField } from '../FormField';
import { FormSelect } from '../FormSelect';

type AdEditFormProps = {
  id: string;
  isSaving: boolean;
  onSave: (data: ItemUpdateInApi) => void;
  onCancel: () => void;
};

const categoryOptions = [
  { label: 'Автомобили', value: 'auto' },
  { label: 'Недвижимость', value: 'real_estate' },
  { label: 'Электроника', value: 'electronics' },
];

export const AdEditForm = ({ id, isSaving, onSave, onCancel }: AdEditFormProps) => {
  const {
    values,
    touched,
    categoryTouched,
    set,
    isValid,
    titleError,
    priceError,
    descAi,
    priceAi,
    handleCategoryChange,
    handleCategoryFieldChange,
    handleDescAi,
    handlePriceAi,
    handleApplyDesc,
    handleApplyPrice,
    handleSave,
  } = useAdEditForm(id, onSave);

  const { category, title, price, description, imageUrl, params: categoryFields } = values;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: colors.bgPage,
          borderRadius: 2,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2.4,
          boxShadow: colors.shadowPanel,
          border: `1px solid ${colors.bgStroke}`,
        }}
      >
        <Typography variant="h2">Редактирование объявления</Typography>

        <Stack gap={1}>
          <FormSelect
            label="Категория"
            value={category}
            onChange={handleCategoryChange}
            options={categoryOptions}
            required
            touched={touched.category}
          />
          <Divider sx={{ my: 1, borderColor: colors.divider }} />

          <FormField
            label="Название"
            value={title}
            onChange={(v) => set('title', v)}
            required
            touched={touched.title}
            error={!!titleError}
            placeholder="Введите название"
            onClear={() => set('title', '')}
            bold
          />
          <Divider sx={{ my: 1, borderColor: colors.divider }} />

          <Stack direction="row" gap={3} alignItems="flex-start">
            <FormField
              label="Цена, ₽"
              value={price}
              onChange={(v) => set('price', v)}
              required
              touched={touched.price}
              error={!!priceError}
              type="number"
              bold
            />
            <AIButton
              isLoading={priceAi.isLoading}
              hasValue={price.length > 0}
              hasResult={priceAi.isDone}
              onClick={handlePriceAi}
              variant="price"
              sx={{ alignSelf: 'flex-start', mt: 3.5 }}
            />
          </Stack>
        </Stack>

        <Divider sx={{ my: 1, borderColor: colors.divider }} />

        <CategoryFields
          category={category}
          values={categoryFields}
          onChange={handleCategoryFieldChange}
          touched={categoryTouched}
        />

        <Divider sx={{ my: 1, borderColor: colors.divider }} />

        <Stack gap={3}>
          <Stack direction="column">
            <FormField
              label="Описание"
              value={description}
              onChange={(v) => set('description', v)}
              multiline
              rows={4}
              placeholder="Опишите товар подробнее..."
              touched={touched.description}
              bold
            />
            <AIButton
              isLoading={descAi.isLoading}
              hasValue={description.length > 0}
              hasResult={descAi.isDone}
              onClick={handleDescAi}
              variant="description"
              sx={{ alignSelf: 'flex-start' }}
            />
          </Stack>

          <AIResultPopover
            anchorEl={descAi.isDone ? descAi.anchorEl : null}
            onClose={descAi.closePopover}
            result={descAi.result}
            error={descAi.error}
            onApply={handleApplyDesc}
          />

          <FormField
            label="Фото (URL)"
            value={imageUrl}
            onChange={(v) => set('imageUrl', v)}
            placeholder="https://example.com/photo.jpg"
            touched={touched.imageUrl}
          />

          <AIResultPopover
            anchorEl={priceAi.isDone ? priceAi.anchorEl : null}
            onClose={priceAi.closePopover}
            result={priceAi.result}
            error={priceAi.error}
            onApply={handleApplyPrice}
          />
        </Stack>

        <Stack direction="row" gap={1.3}>
          <Button
            variant="contained"
            disabled={!isValid || isSaving}
            onClick={handleSave}
            sx={{
              minWidth: 108,
              backgroundColor: colors.primary,
              color: colors.textInverse,
              boxShadow: colors.shadowBtn,
              fontWeight: 400,
              fontSize: 16,
              lineHeight: 1.4,
            }}
          >
            {isSaving ? 'Сохранение...' : 'Сохранить'}
          </Button>
          <Button
            variant="outlined"
            onClick={onCancel}
            disabled={isSaving}
            sx={{
              minWidth: 108,
              backgroundColor: colors.divider,
              color: colors.cancelText,
              fontWeight: 400,
              fontSize: 16,
              lineHeight: 1.4,
            }}
          >
            Отменить
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};
