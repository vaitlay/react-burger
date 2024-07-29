import mainStyle from './app.module.css'

import { Routes, Route } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

import ProtectedRouteElement from '../protected-route-element/protected-route-element.jsx'
import AppHeader from '../app-header/header/app-header.jsx'
import IngredientDetails from '../ingredient-details/ingredient-details.jsx'
import Modal from '../modal/modal.jsx';

import MainPage from '../../pages/main.jsx'
import LoginPage from '../../pages/login.jsx'
import RegisterPage from '../../pages/register.jsx'
import ForgotPasswordPage from '../../pages/forgot-password.jsx'
import ResetPasswordPage from '../../pages/reset-password.jsx'
import ProfilePage from '../../pages/profile/profile.jsx'
import ProfileForm from '../../pages/profile/profile-form.jsx'
import Orders from '../../pages/profile/orders.jsx'
import IngredientPage from '../../pages/ingredient.jsx'
import NotFound404 from '../../pages/not-found.jsx'

import { 
  ROUTE_LOGIN, 
  ROUTE_REGISTER, 
  ROUTE_FORGOT_PASSWORD, 
  ROUTE_RESET_PASSWORD, 
  ROUTE_PROFILE,
  ROUTE_ORDERS,
  ROUTE_INGREDIENTS } from '../../utils/route-endpoints.js'


function App() {

  const location = useLocation();
  const navigate = useNavigate();

  const backgroundLocation = location.state? location.state.backgroundLocation : null;

  return (
    <>
        <AppHeader />
          <main className = {mainStyle.container} >
          <Routes location={backgroundLocation || location}>
            <Route path="/" element={<MainPage />} />
            <Route path={ROUTE_LOGIN} element={<ProtectedRouteElement onlyAuth = {false} element={<LoginPage />} />} />
            <Route path={ROUTE_REGISTER} element={<ProtectedRouteElement onlyAuth = {false} element={<RegisterPage />} />} /> 
            <Route path={ROUTE_FORGOT_PASSWORD} element={<ProtectedRouteElement onlyAuth = {false} element={<ForgotPasswordPage />} />} /> 
            <Route path={ROUTE_RESET_PASSWORD} element={<ResetPasswordPage />} /> 
            <Route path={ROUTE_ORDERS} element={<Orders />} /> 
            <Route path={ROUTE_PROFILE} element={<ProtectedRouteElement onlyAuth = {true} element={<ProfilePage />} />}>
              <Route index element={<ProfileForm/>} />
              <Route path = {ROUTE_ORDERS} element={<Orders/>} />
            </Route>
            <Route path={ROUTE_INGREDIENTS + '/:_id'} element={<IngredientPage />} />
            <Route path="*" element={<NotFound404/>}/>
          </Routes>  
          {backgroundLocation && (
            <Routes>
              <Route path={ROUTE_INGREDIENTS + '/:_id'} element = {
                <Modal header = 'Детали ингридиента' onClose = {() => navigate('/')}>
                  <IngredientDetails />
                </Modal>   
                } />
            </Routes>
          )} 
          </main>          
    </> 
  ) 
}

export default App
