import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import propTypes from 'prop-types';
import { getUserData } from '../../services/actions/auth';
import { ROUTE_LOGIN } from '../../utils/route-endpoints';

const ProtectedRouteElement = ({ onlyAuth, element }) => {
  const { loggedIn, authChecked} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const location = useLocation();

    
  useEffect(() => {
    if (!authChecked) dispatch(getUserData());
  }, []);
  

    if (onlyAuth && !loggedIn) return <Navigate to = {ROUTE_LOGIN} state = {{from : location}} />
    if (!onlyAuth && loggedIn) {
      const { from } = location.state || { from : {pathname : '/'}};
      return <Navigate to = {from} />
    }

  return  element;
}

ProtectedRouteElement.propTypes = {
  onlyAuth: propTypes.bool.isRequired,
  element: propTypes.element.isRequired
}

export default ProtectedRouteElement;
