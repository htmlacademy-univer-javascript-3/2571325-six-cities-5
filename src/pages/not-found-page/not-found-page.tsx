import { Link } from 'react-router-dom';
import { AppRoutes } from '../../constants/routers';

const NotFoundPage = () => (
  <Link to={AppRoutes.Default}>
    <div style={{position: 'absolute', top: '20%', width: '100%', display: 'flex', alignItems: 'center', fontSize: '26px', justifyContent: 'center'}} data-testid='not-found'>Not Found 404</div>
  </Link>
);

export default NotFoundPage;
