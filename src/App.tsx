import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import { ConfirmModal, DynamicModal, LoadingModal, ToastWrapper } from './components';
import { Bikes, Dashboard, Error, Login, Managers, Register, Reservations, Store, Users } from './pages'
import { useBikeStore, useReservationStore } from './store';

function App() {

  const { getBikes } = useBikeStore()
  const { getReservations } = useReservationStore()

  useEffect(() => {
    getBikes()
    getReservations()
  }, [getBikes, getReservations])

  return (
    <>
      <ToastWrapper />
      <ConfirmModal />
      <DynamicModal />
      <LoadingModal />
      <Switch>
        <Route exact path='/' component={Store} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/dashboard/users' component={Users} />
        <Route exact path='/dashboard/managers' component={Managers} />
        <Route exact path='/dashboard/bikes' component={Bikes} />
        <Route exact path='/dashboard/reservations' component={Reservations} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;
