import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Divider,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  type SelectChangeEvent,
} from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useEffect, useState } from 'react';

import { useDebounce } from '@/hooks/useDebounce';
import type { LayoutType } from '@/types/layoutType';
import type { SortOptionType } from '@/types/sortOptionType';

import { SORT_OPTIONS } from './constants';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  layout: LayoutType;
  onLayoutChange: (layout: LayoutType) => void;
  sortValue: string;
  onSortChange: (value: string) => void;
  sortOptions?: SortOptionType[];
};

const SearchBar = ({
  value,
  onChange,
  layout,
  onLayoutChange,
  sortValue,
  onSortChange,
  sortOptions = SORT_OPTIONS,
}: SearchBarProps) => {
  const [localValue, setLocalValue] = useState(value);

  const debouncedValue = useDebounce(localValue, 400);

  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, onChange, value]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'stretch', md: 'center' },
        gap: 3,
        padding: 1.5,
        borderRadius: 1,
        backgroundColor: 'background.paper',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <OutlinedInput
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="Найти объявление...."
        fullWidth
        sx={{
          flexGrow: 1,
          backgroundColor: 'background.search',
          borderRadius: 1,
          color: 'text.primary',
          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
          '& .MuiOutlinedInput-input': {
            padding: '8px 12px',
            '&::placeholder': { color: 'text.secondary', opacity: 1 },
          },
        }}
        endAdornment={
          <InputAdornment
            position="end"
            sx={{
              padding: '9px 12px',
              borderRadius: '0 8px 8px 0',
              backgroundColor: 'background.search',
              marginRight: '-14px',
              color: 'text.primary',
            }}
          >
            <SearchIcon fontSize="small" />
          </InputAdornment>
        }
      />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: { xs: 'space-between', md: 'flex-end' },
          gap: 2,
          flexShrink: 0,
        }}
      >
        <ToggleButtonGroup
          value={layout}
          exclusive
          size="small"
          onChange={(_e, value) => {
            if (value !== null) onLayoutChange(value);
          }}
          aria-label="text alignment"
          sx={{ borderRadius: 1 }}
        >
          <ToggleButton value="grid" aria-label="Сетка">
            <GridViewOutlinedIcon />
          </ToggleButton>
          <Divider orientation="vertical" sx={{ width: 4, height: 32 }} />
          <ToggleButton value="list" aria-label="Список">
            <FormatListBulletedIcon />
          </ToggleButton>
        </ToggleButtonGroup>

        <Select
          value={sortValue}
          onChange={(e: SelectChangeEvent) => onSortChange(e.target.value)}
          IconComponent={KeyboardArrowDownIcon}
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: 1,
            height: 32,
            minWidth: 240,
            typography: 'body1',
            boxSizing: 'border-box',

            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'background.default',
              borderWidth: 4,
              boxSizing: 'border-box',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'divider',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'background.default',
              borderWidth: 4,
            },
            '& .MuiSelect-select': {
              padding: '6px 32px 6px 16px',
            },
          }}
        >
          {sortOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value} sx={{ typography: 'body1' }}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export default SearchBar;
