import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../hooks/useSelector';
import { useDispatch } from '../../hooks/useDispatch';

import { TAuth } from '../../types';
import { getUserData } from '../../services/actions/auth';
import { ROUTE_LOGIN } from '../../utils/route-endpoints';

type TProtectedRoute = {
  onlyAuth: boolean;
  element: JSX.Element;
}

const ProtectedRouteElement = ({ onlyAuth, element }: TProtectedRoute): JSX.Element => {
  const { loggedIn, authChecked } = useSelector((state) => state.authReducer);
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


export default ProtectedRouteElement;
