import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { NavigateNext } from '@mui/icons-material';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <MuiBreadcrumbs
      separator={<NavigateNext fontSize="small" />}
      sx={{ mb: 3, mt: 1 }}
    >
      <Link color="inherit" href="/admin">
        Home
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Typography key={name} color="text.primary">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Typography>
        ) : (
          <Link key={name} color="inherit" href={routeTo}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
}