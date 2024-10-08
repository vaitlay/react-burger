import mainStyle from './app.module.css'

import { Routes, Route } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

import ProtectedRouteElement from '../protected-route-element/protected-route-element'
import AppHeader from '../app-header/app-header'
import IngredientDetails from '../ingredient-details/ingredient-details'
import Modal from '../modal/modal';

import MainPage from '../../pages/main'
import LoginPage from '../../pages/login'
import RegisterPage from '../../pages/register'
import ForgotPasswordPage from '../../pages/forgot-password'
import ResetPasswordPage from '../../pages/reset-password'
import ProfilePage from '../../pages/profile/profile'
import ProfileForm from '../../pages/profile/profile-form'
import ProfileOrders from '../../pages/profile/profile-orders'
import IngredientPage from '../../pages/ingredient'
import FeedPage from '../../pages/feed'
import OrderInfoPage from '../../pages/order-info-page'
import NotFound404 from '../../pages/not-found'

import { 
  ROUTE_LOGIN, 
  ROUTE_REGISTER, 
  ROUTE_FORGOT_PASSWORD, 
  ROUTE_RESET_PASSWORD, 
  ROUTE_PROFILE,
  ROUTE_PROFILE_ORDERS,
  ROUTE_ORDERS,
  ROUTE_INGREDIENTS,
  ROUTE_FEED } from '../../utils/route-endpoints.js'


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
            <Route path={ROUTE_PROFILE} element={<ProtectedRouteElement onlyAuth = {true} element={<ProfilePage />} />}>
              <Route index element={<ProfileForm/>} />
              <Route path = {ROUTE_ORDERS} element={<ProfileOrders/>} />
            </Route>
            <Route path={ROUTE_PROFILE_ORDERS + '/:number'} element={<ProtectedRouteElement onlyAuth = {true} element = {<OrderInfoPage isUserProfile = {true} />} />} />
            <Route path={ROUTE_INGREDIENTS + '/:_id'} element={<IngredientPage />} />
            <Route path={ROUTE_FEED} element={<FeedPage/>} />
            <Route path={ROUTE_FEED + '/:number'} element={<OrderInfoPage isUserProfile = {false} />} />
            <Route path="*" element={<NotFound404/>}/>
          </Routes>  
          {backgroundLocation && (
            <Routes>
              <Route path={ROUTE_INGREDIENTS + '/:_id'} element = {
                <Modal header = 'Детали ингредиента' onClose = {() => navigate('/')} >
                  <IngredientDetails />
                </Modal>   
                } />
              <Route path={ROUTE_FEED + '/:number'} element = {
                <Modal header = '' onClose = {() => navigate(ROUTE_FEED)}>
                  <OrderInfoPage isUserProfile = {false}/>
                </Modal>   
                } />  
              <Route path={ROUTE_PROFILE_ORDERS + '/:number'} element = {
                <Modal header = '' onClose = {() => navigate(ROUTE_PROFILE_ORDERS)}>
                  <OrderInfoPage isUserProfile = {true}/>
                </Modal>   
                } />                               
            </Routes>
          )} 
          </main>          
    </> 
  ) 
}

export default App
