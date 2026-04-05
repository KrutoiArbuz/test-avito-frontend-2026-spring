import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';

import { colors } from '@/config/theme';
import type { CategoryType } from '@/types/itemTypes';

import { AIButton } from '../AIButton';
import { AIResultPopover } from '../AIResultPopover';
import { CategoryFields } from '../CategoryFields';
import { FormField } from '../FormField';
import { FormSelect } from '../FormSelect';

type AdEditFormProps = {
  onSave: (data: Record<string, unknown>) => void;
  onCancel: () => void;
};

const categoryOptions = [
  { label: 'Автомобили', value: 'auto' },
  { label: 'Недвижимость', value: 'real_estate' },
  { label: 'Электроника', value: 'electronics' },
];

export const AdEditForm = ({ onSave, onCancel }: AdEditFormProps) => {
  const [title, setTitle] = useState('MacBook Pro 16"');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('120000');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<CategoryType>('electronics');
  const [categoryFields, setCategoryFields] = useState<Record<string, string>>({
    type: 'laptop',
    brand: 'Apple',
    model: 'M1 Pro',
    color: 'Silver',
    condition: 'new',
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [categoryTouched, setCategoryTouched] = useState<Record<string, boolean>>({});
  const [descAiLoading, setDescAiLoading] = useState(false);
  const [descAiResult, setDescAiResult] = useState('');
  const [descAiDone, setDescAiDone] = useState(false);

  const [priceAiLoading, setPriceAiLoading] = useState(false);
  const [priceAiResult, setPriceAiResult] = useState('');
  const [priceAiDone, setPriceAiDone] = useState(false);
  const [descAiAnchorEl, setDescAiAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [priceAiAnchorEl, setPriceAiAnchorEl] = useState<HTMLButtonElement | null>(null);

  const isValid = title.trim().length > 0 && category && price.trim().length > 0;
  const titleError = touched.title && !title.trim();

  const handleCategoryFieldChange = (field: string, value: string) => {
    setCategoryFields({ ...categoryFields, [field]: value });
    setCategoryTouched({ ...categoryTouched, [field]: true });
  };

  const handleDescAi = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDescAiAnchorEl(e.currentTarget);
    setDescAiLoading(true);
    setTimeout(() => {
      setDescAiResult(
        'Продаю MacBook Pro 16" M1 Pro в отличном состоянии. Ноутбук работал бережно, все функции исправны. Полная комплектация, без царапин.'
      );
      setDescAiLoading(false);
      setDescAiDone(true);
    }, 1200);
  };

  const handlePriceAi = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPriceAiAnchorEl(e.currentTarget);
    setPriceAiLoading(true);
    setTimeout(() => {
      setPriceAiResult('Средняя цена: 115 000 – 135 000 ₽');
      setPriceAiLoading(false);
      setPriceAiDone(true);
    }, 1200);
  };

  const handleApplyDesc = () => {
    setDescription(descAiResult);
    setDescAiDone(false);
    setDescAiResult('');
  };

  const parsePrice = (text: string): string => {
    const match = text.match(/(\d[\d\s]*\d)\s*[₽р]?/);
    if (match) {
      return match[1].replace(/\s/g, '');
    }
    return '';
  };

  const handleApplyPrice = () => {
    const parsedPrice = parsePrice(priceAiResult);
    if (parsedPrice) {
      setPrice(parsedPrice);
    }
    setPriceAiDone(false);
    setPriceAiResult('');
  };

  const handleSave = () => {
    setTouched({ title: true });
    if (!isValid) return;

    const data = {
      title,
      description,
      price: parseInt(price, 10),
      imageUrl,
      category,
      params: categoryFields,
    };
    onSave(data);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
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
            onChange={(val) => setCategory(val as CategoryType)}
            options={categoryOptions}
            required
            touched={touched.category}
          />
          <Divider sx={{ my: 1, borderColor: colors.divider }} />

          <FormField
            label="Название"
            value={title}
            onChange={setTitle}
            required
            touched={touched.title}
            error={titleError}
            placeholder="Введите название"
            onClear={() => setTitle('')}
            bold
          />
          <Divider sx={{ my: 1, borderColor: colors.divider }} />

          <Stack direction="row" gap={3} alignItems="flex-start">
            <FormField
              label="Цена, ₽"
              value={price}
              onChange={setPrice}
              required
              touched={touched.price}
              type="number"
              bold
            />
            <AIButton
              isLoading={priceAiLoading}
              hasValue={price.length > 0}
              hasResult={priceAiDone}
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
              onChange={setDescription}
              multiline
              rows={4}
              placeholder="Опишите товар подробнее..."
              touched={touched.description}
              bold
            />
            <AIButton
              isLoading={descAiLoading}
              hasValue={description.length > 0}
              hasResult={descAiDone}
              onClick={handleDescAi}
              variant="description"
              sx={{ alignSelf: 'flex-start' }}
            />
          </Stack>

          <AIResultPopover
            anchorEl={descAiDone ? descAiAnchorEl : null}
            onClose={() => {
              setDescAiDone(false);
              setDescAiResult('');
              setDescAiAnchorEl(null);
            }}
            result={descAiResult}
            onApply={handleApplyDesc}
          />

          <FormField
            label="Фото (URL)"
            value={imageUrl}
            onChange={setImageUrl}
            placeholder="https://example.com/photo.jpg"
            touched={touched.imageUrl}
          />

          <AIResultPopover
            anchorEl={priceAiDone ? priceAiAnchorEl : null}
            onClose={() => {
              setPriceAiDone(false);
              setPriceAiResult('');
              setPriceAiAnchorEl(null);
            }}
            result={priceAiResult}
            onApply={handleApplyPrice}
          />
        </Stack>

        <Stack direction="row" gap={1.3}>
          <Button
            variant="contained"
            disabled={!isValid}
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
            Сохранить
          </Button>
          <Button
            variant="outlined"
            onClick={onCancel}
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
