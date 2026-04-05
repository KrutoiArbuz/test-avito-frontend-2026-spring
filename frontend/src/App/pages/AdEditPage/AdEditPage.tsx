import { Alert, Box, CircularProgress, Container, Snackbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useItemQuery } from '@/hooks/queries/useItemQuery';
import { useUpdateItemMutation } from '@/hooks/queries/useUpdateItemMutation';
import { useEditDraftStore } from '@/stores/editFormStore';
import type { ItemUpdateInApi } from '@/types/itemTypes';

import { AdEditForm } from './components/AdEditForm';

type ToastState = { open: boolean; success: boolean };

const AdEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: item, isLoading, isError } = useItemQuery(id ?? '');
  const mutation = useUpdateItemMutation(id ?? '');
  const initDraft = useEditDraftStore((s) => s.initDraft);
  const clearDraft = useEditDraftStore((s) => s.clearDraft);

  const [toast, setToast] = useState<ToastState>({ open: false, success: false });

  useEffect(() => {
    if (item && id) initDraft(id, item);
  }, [item, id, initDraft]);

  const handleSave = (data: ItemUpdateInApi) => {
    mutation.mutate(data, {
      onSuccess: () => {
        setToast({ open: true, success: true });
        setTimeout(() => {
          if (id) clearDraft(id);
          navigate(-1);
        }, 1200);
      },
      onError: () => {
        setToast({ open: true, success: false });
      },
    });
  };

  const handleCancel = () => navigate(-1);

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="md" sx={{ py: 3 }}>
        {isLoading ? (
          <Box sx={{ py: 10, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : isError || !id ? (
          <Box sx={{ py: 10, textAlign: 'center' }}>
            <Typography color="error">Не удалось загрузить объявление</Typography>
          </Box>
        ) : (
          <AdEditForm
            id={id}
            isSaving={mutation.isPending}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
      </Container>

      <Snackbar
        open={toast.open && toast.success}
        autoHideDuration={3000}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success" onClose={() => setToast((t) => ({ ...t, open: false }))}>
          Изменения сохранены
        </Alert>
      </Snackbar>

      <Snackbar
        open={toast.open && !toast.success}
        autoHideDuration={5000}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="error" onClose={() => setToast((t) => ({ ...t, open: false }))}>
          <Typography fontWeight={600} fontSize={14}>
            Ошибка сохранения
          </Typography>
          <Typography fontSize={13}>
            При попытке сохранить изменения произошла ошибка. Попробуйте ещё раз или зайдите позже.
          </Typography>
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdEditPage;
