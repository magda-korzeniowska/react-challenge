import { Card as MuiCard, CardHeader } from '@mui/material';

export const Card = ({ title, subheader, children, variant, ...props }) => {
  return (
    <MuiCard variant="outlined" {...props}>
      <CardHeader
        title={title}
        variant={'h3'}
        titleTypographyProps={variant}
        subheader={subheader}
        subheaderTypographyProps={{
          variant: 'subtitle1',
        }}
      />
      {children}
    </MuiCard>
  );
};
