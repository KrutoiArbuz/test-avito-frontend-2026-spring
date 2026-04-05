import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import ExpandMore from '@/components/ExpandMore';
import type { CategoryType } from '@/types/itemTypes';

const CATEGORY_OPTIONS: { value: CategoryType; label: string }[] = [
  { value: 'auto', label: 'Авто' },
  { value: 'electronics', label: 'Электроника' },
  { value: 'real_estate', label: 'Недвижимость' },
];

type FiltersPanelProps = {
  selectedCategories: CategoryType[];
  onCategoriesChange: (categories: CategoryType[]) => void;
  needsRevision: boolean;
  onNeedsRevisionChange: (value: boolean) => void;
  onReset: () => void;
};

const FiltersPanel = ({
  selectedCategories,
  onCategoriesChange,
  needsRevision,
  onNeedsRevisionChange,
  onReset,
}: FiltersPanelProps) => {
  const handleCategoryToggle = (category: CategoryType) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoriesChange([...selectedCategories, category]);
    }
  };
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, width: { xs: '100%', sm: 256 } }}
    >
      <Box
        sx={{
          padding: 2,
          borderRadius: 1,
          backgroundColor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.25,
        }}
      >
        <Typography variant="subtitle2">Фильтры</Typography>

        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',

              cursor: 'pointer',
            }}
          >
            <Typography variant="body1" color="text.primary">
              Категория
            </Typography>

            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            </ExpandMore>
          </Box>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <FormGroup sx={{ pb: 1 }}>
              {CATEGORY_OPTIONS.map(({ value, label }) => (
                <FormControlLabel
                  sx={{ my: -0.5 }}
                  key={value}
                  control={
                    <Checkbox
                      checked={selectedCategories.includes(value)}
                      onChange={() => handleCategoryToggle(value)}
                    />
                  }
                  label={<Typography variant="body1">{label}</Typography>}
                />
              ))}
            </FormGroup>
          </Collapse>
        </Box>

        <Box>
          <Divider sx={{ borderColor: 'divider' }} />
        </Box>
        <Box
          sx={{
            display: 'flex',

            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2" sx={{ maxWidth: '70%' }}>
            Только требующие доработок
          </Typography>
          <Switch
            checked={needsRevision}
            onChange={(e) => onNeedsRevisionChange(e.target.checked)}
            size="small"
            color="primary"
          />
        </Box>
      </Box>

      <Button
        variant="text"
        onClick={onReset}
        fullWidth
        sx={{
          fontSize: 14,
          backgroundColor: 'background.paper',
          color: 'text.secondary',
          justifyContent: 'center',
          py: 1.5,
          '&:hover': {
            backgroundColor: 'background.default',
          },
        }}
      >
        Сбросить фильтры
      </Button>
    </Box>
  );
};

export default FiltersPanel;
