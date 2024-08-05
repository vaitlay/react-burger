import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { TAuth } from '../../types';
import { getUserData } from '../../services/actions/auth';
import { ROUTE_LOGIN } from '../../utils/route-endpoints';
import { JsxElement } from 'typescript';


type TProtectedRoute = {
  onlyAuth: boolean;
  element: JSX.Element;
}

const ProtectedRouteElement = ({ onlyAuth, element }: TProtectedRoute): JSX.Element => {
  const { loggedIn, authChecked } = useSelector((state: any) => state.authReducer as TAuth); //Доделать типизацию redux
  const dispatch = useDispatch();
  const location = useLocation();

    
  useEffect(() => {
    if (!authChecked) dispatch(getUserData() as any); //Доделать типизацию redux
  }, []);
  

    if (onlyAuth && !loggedIn) return <Navigate to = {ROUTE_LOGIN} state = {{from : location}} />
    if (!onlyAuth && loggedIn) {
      const { from } = location.state || { from : {pathname : '/'}};
      return <Navigate to = {from} />
    }

  return  element;
}


export default ProtectedRouteElement;