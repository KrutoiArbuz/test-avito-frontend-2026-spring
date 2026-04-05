import { Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { useItemEditDate } from '@/hooks/useItemEditDate';

import { AdEditForm } from './components/AdEditForm';

const AdEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updateEditDate } = useItemEditDate(id || '');

  const handleSave = (_data: Record<string, unknown>) => {
    // TODO: PUT /items/:id + toast
    updateEditDate();
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Box sx={{ maxWidth: 1103, width: '100%', margin: '0 auto', py: 3 }}>
        <AdEditForm onSave={handleSave} onCancel={handleCancel} />
      </Box>
    </Box>
  );
};

export default AdEditPage;
