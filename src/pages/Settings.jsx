import {
  Card,
  CardContent,
  Grid,
  Typography,
  Switch,
  FormControlLabel,
  Divider,
} from '@mui/material';

export default function Settings() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Notifications
            </Typography>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Email Notifications"
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Push Notifications"
            />
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Privacy
            </Typography>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Show Online Status"
            />
            <FormControlLabel
              control={<Switch />}
              label="Share Usage Data"
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}