import { Grid } from '@mui/material';
import ProductionList from '../../../components/admin/production/ProductionList';

export default function AdminProductionPage() {
  const type = window.location.pathname.includes('w-cut') ? 'wCut' : 'dCut';
  const category = window.location.pathname.includes('flexo') ? 'flexo' : 
                  window.location.pathname.includes('opsert') ? 'opsert' : 'bagMaking';

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ProductionList type={type} category={category} />
      </Grid>
    </Grid>
  );
}