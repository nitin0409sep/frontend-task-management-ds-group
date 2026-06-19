import { FilterList, Search } from '@mui/icons-material';
import { Box, Button, Divider, Drawer, IconButton, InputAdornment, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import type { TaskFilters } from '../../../types/task';

type TaskFiltersBarProps = {
  filters: TaskFilters;
  onChange: (filters: TaskFilters) => void;
};

const FilterFields = ({ filters, onChange }: TaskFiltersBarProps) => (
  <>
    <TextField select label="Status" value={filters.status ?? ''} onChange={(event) => onChange({ ...filters, status: event.target.value as TaskFilters['status'] })}>
      <MenuItem value="">All status</MenuItem>
      <MenuItem value="todo">To do</MenuItem>
      <MenuItem value="in_progress">In progress</MenuItem>
      <MenuItem value="done">Done</MenuItem>
    </TextField>
    <TextField select label="Priority" value={filters.priority ?? ''} onChange={(event) => onChange({ ...filters, priority: event.target.value as TaskFilters['priority'] })}>
      <MenuItem value="">All priority</MenuItem>
      <MenuItem value="low">Low</MenuItem>
      <MenuItem value="medium">Medium</MenuItem>
      <MenuItem value="high">High</MenuItem>
    </TextField>
    <TextField select label="Sort by" value={filters.sortBy ?? 'createdAt'} onChange={(event) => onChange({ ...filters, sortBy: event.target.value as TaskFilters['sortBy'] })}>
      <MenuItem value="createdAt">Created date</MenuItem>
      <MenuItem value="priority">Priority</MenuItem>
      <MenuItem value="dueDate">Due date</MenuItem>
    </TextField>
    <TextField select label="Order" value={filters.sortOrder ?? 'desc'} onChange={(event) => onChange({ ...filters, sortOrder: event.target.value as 'asc' | 'desc' })}>
      <MenuItem value="asc">Ascending</MenuItem>
      <MenuItem value="desc">Descending</MenuItem>
    </TextField>
  </>
);

export const TaskFiltersBar = ({ filters, onChange }: TaskFiltersBarProps) => {
  const searchValue = filters.search ?? '';
  const [searchInput, setSearchInput] = useState(searchValue);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState<TaskFilters>(filters);

  useEffect(() => {
    setSearchInput(searchValue);
  }, [searchValue]);

  useEffect(() => {
    if (searchInput === searchValue) return;

    const timeoutId = window.setTimeout(() => {
      onChange({ ...filters, search: searchInput });
    }, 350);

    return () => window.clearTimeout(timeoutId);
  }, [filters, onChange, searchInput, searchValue]);

  const openSheet = () => {
    setDraftFilters(filters);
    setIsSheetOpen(true);
  };

  const closeSheet = () => setIsSheetOpen(false);

  const applySheetFilters = () => {
    onChange({ ...draftFilters, search: searchInput });
    closeSheet();
  };

  const resetSheetFilters = () => {
    setDraftFilters({ search: searchInput, sortOrder: 'desc' });
  };

  return (
    <>
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          gap: 1,
          alignItems: 'center',
        }}
      >
        <TextField
          label="Search tasks"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> } }}
        />
        <IconButton
          aria-label="Open filters"
          onClick={openSheet}
          sx={{
            width: 56,
            height: 56,
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
            bgcolor: 'background.paper',
          }}
        >
          <FilterList />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: { xs: 'none', md: 'grid' },
          gridTemplateColumns: 'minmax(260px, 1.7fr) repeat(4, minmax(130px, 1fr))',
          gap: 1.5,
          alignItems: 'center',
        }}
      >
        <TextField
          label="Search tasks"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> } }}
        />
        <FilterFields filters={filters} onChange={onChange} />
      </Box>

      <Drawer
        anchor="bottom"
        open={isSheetOpen}
        onClose={closeSheet}
        slotProps={{
          paper: {
            sx: {
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              pb: 'env(safe-area-inset-bottom)',
            },
          },
        }}
      >
        <Stack spacing={2} sx={{ p: 2.5 }}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Filters</Typography>
            <Button size="small" onClick={resetSheetFilters}>Reset</Button>
          </Stack>
          <Divider />
          <Stack spacing={1.5}>
            <FilterFields filters={draftFilters} onChange={setDraftFilters} />
          </Stack>
          <Stack direction="row" spacing={1.5}>
            <Button variant="outlined" fullWidth onClick={closeSheet}>Cancel</Button>
            <Button variant="contained" fullWidth onClick={applySheetFilters}>Apply</Button>
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
};
