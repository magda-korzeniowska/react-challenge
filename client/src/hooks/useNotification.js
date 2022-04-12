import { useSnackbar } from 'notistack';
import { theme } from '../theme';

const snackbars = {
  expense: {
    variant: 'success',
    message: 'Wydatek został zapisany',
  },
  income: {
    variant: 'success',
    message: 'Wpływ został dodany',
  },
  budget: {
    variant: 'success',
    message: 'Budżet został zdefiniowany',
  },
  delete: {
    variant: 'success',
    message: 'Element został usunięty',
  },
  error: {
    variant: 'error',
    message: 'Wystąpił nieoczekiwany błąd',
  },
};

export const useNotification = (type) => {
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (type) => {
    enqueueSnackbar(snackbars[type].message, {
      variant: snackbars[type].variant,
      autoHideDuration: 5000,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
      sx: {
        '& .SnackbarContent-root': {
          backgroundColor:
            snackbars[type].variant === 'success'
              ? theme.palette.success.main
              : theme.palette.error.main,
        },
      },
    });
  };
  return showSnackbar;
};
