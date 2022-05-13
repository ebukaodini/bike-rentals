import { useEffect, useState, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom'
import { ConfirmModal, DynamicModal, ToastWrapper } from './components'
import { useBikeStore, useReservationStore } from './store';
import { AdminBikeReservations, AdminReservations, AdminUserReservations, Bikes, Dashboard, Error, Login, Managers, Register, Reservations, Store, Users } from './pages'

// Note: Commented out because it doesn't allow for tests
// const Store = lazy(() => import('./pages/Store'));
// const Reservations = lazy(() => import('./pages/Reservations'));
// const Login = lazy(() => import('./pages/Login'));
// const Register = lazy(() => import('./pages/Register'));
// const Error = lazy(() => import('./pages/Error'));
// const AdminReservations = lazy(() => import('./pages/admin/Reservations'));
// const Bikes = lazy(() => import('./pages/admin/Bikes'));
// const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
// const Managers = lazy(() => import('./pages/admin/Managers'));
// const Users = lazy(() => import('./pages/admin/Users'));
// const AdminUserReservations = lazy(() => import('./pages/admin/AdminUserReservations'));
// const AdminBikeReservations = lazy(() => import('./pages/admin/AdminBikeReservations'));

export function App() {

  const { getBikes } = useBikeStore()
  const { getReservations } = useReservationStore()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (loaded === false) {
      Promise.all([
        getBikes(),
        getReservations()
      ]).then(_ => {
        setLoaded(true)
      })
    }
  }, [getBikes, getReservations, loaded])

  return (
    <>
      <ToastWrapper />
      <ConfirmModal />
      <DynamicModal />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path='/' component={Store} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/reservations' component={Reservations} />
          <Route exact path='/dashboard/users' component={Users} />
          <Route exact path='/dashboard/users/:id/reservations' component={AdminUserReservations} />
          <Route exact path='/dashboard/managers' component={Managers} />
          <Route exact path='/dashboard/bikes' component={Bikes} />
          <Route exact path='/dashboard/bikes/:id/reservations' component={AdminBikeReservations} />
          <Route exact path='/dashboard/reservations' component={AdminReservations} />
          <Route component={Error} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
