import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Theme } from '../themes/themes'
import App from '../App'

test('testing route \'/\'', () => {
  const history = createMemoryHistory()
  const route = '/'
  history.push(route)
  render(
    <Router history={history} >
      <React.StrictMode>
        <ThemeProvider theme={Theme}>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </Router>
  )

  expect(screen.getByText('Reserve a Bike for any type of Journey.')).toBeInTheDocument()
})

test('testing route \'/login\'', () => {
  const history = createMemoryHistory()
  const route = '/login'
  history.push(route)
  render(
    <Router history={history} >
      <React.StrictMode>
        <ThemeProvider theme={Theme}>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </Router>
  )

  expect(screen.getByText('Welcome Back')).toBeInTheDocument()
})

test('testing route \'/register\'', () => {
  const history = createMemoryHistory()
  const route = '/register'
  history.push(route)
  render(
    <Router history={history} >
      <React.StrictMode>
        <ThemeProvider theme={Theme}>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </Router>
  )

  expect(screen.getByText('Create Account')).toBeInTheDocument()
})

test('testing route \'/reservations\'', () => {
  const history = createMemoryHistory()
  const route = '/reservations'
  history.push(route)
  render(
    <Router history={history} >
      <React.StrictMode>
        <ThemeProvider theme={Theme}>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </Router>
  )

  // export redirect back to / when user not authenticated
  expect(screen.getByText('Reserve a Bike for any type of Journey.')).toBeInTheDocument()
  expect(history.location.pathname).toEqual('/')
})

test('testing route \'/wrongpage\'', async () => {
  const history = createMemoryHistory()
  const route = '/wrongpage'
  history.push(route)
  await render(
    <Router history={history} >
      <React.StrictMode>
        <ThemeProvider theme={Theme}>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </Router>,
  )

  expect(screen.getByText('Unknown Page')).toBeInTheDocument()
})

test('testing route \'/dashboard\'', () => {
  const history = createMemoryHistory()
  const route = '/dashboard'
  history.push(route)
  render(
    <Router history={history} >
      <React.StrictMode>
        <ThemeProvider theme={Theme}>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </Router>
  )

  // export redirect back to / when user not authenticated
  expect(screen.getByText('Reserve a Bike for any type of Journey.')).toBeInTheDocument()
  expect(history.location.pathname).toEqual('/')
})

test('testing route \'/dashboard/users\'', () => {
  const history = createMemoryHistory()
  const route = '/dashboard/users'
  history.push(route)
  render(
    <Router history={history} >
      <React.StrictMode>
        <ThemeProvider theme={Theme}>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </Router>
  )

  // export redirect back to / when user not authenticated
  expect(screen.getByText('Reserve a Bike for any type of Journey.')).toBeInTheDocument()
  expect(history.location.pathname).toEqual('/')
})

test('testing route \'/dashboard/bikes\'', () => {
  const history = createMemoryHistory()
  const route = '/dashboard/bikes'
  history.push(route)
  render(
    <Router history={history} >
      <React.StrictMode>
        <ThemeProvider theme={Theme}>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </Router>
  )

  // export redirect back to / when user not authenticated
  expect(screen.getByText('Reserve a Bike for any type of Journey.')).toBeInTheDocument()
  expect(history.location.pathname).toEqual('/')
})

test('testing route \'/dashboard/reservations\'', () => {
  const history = createMemoryHistory()
  const route = '/dashboard/reservations'
  history.push(route)
  render(
    <Router history={history} >
      <React.StrictMode>
        <ThemeProvider theme={Theme}>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </Router>
  )

  // export redirect back to / when user not authenticated
  expect(screen.getByText('Reserve a Bike for any type of Journey.')).toBeInTheDocument()
  expect(history.location.pathname).toEqual('/')
})

test('testing route \'/dashboard/managers\'', () => {
  const history = createMemoryHistory()
  const route = '/dashboard/managers'
  history.push(route)
  render(
    <Router history={history} >
      <React.StrictMode>
        <ThemeProvider theme={Theme}>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </Router>
  )

  // export redirect back to / when user not authenticated
  expect(screen.getByText('Reserve a Bike for any type of Journey.')).toBeInTheDocument()
  expect(history.location.pathname).toEqual('/')
})

test('testing route \'/dashboard/users/12345/reservations\'', () => {
  const history = createMemoryHistory()
  const route = '/dashboard/users/12345/reservations'
  history.push(route)
  render(
    <Router history={history} >
      <React.StrictMode>
        <ThemeProvider theme={Theme}>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </Router>
  )

  // export redirect back to / when user not authenticated
  expect(screen.getByText('Reserve a Bike for any type of Journey.')).toBeInTheDocument()
  expect(history.location.pathname).toEqual('/')
})

test('testing route \'/dashboard/bikes/12345/reservations\'', () => {
  const history = createMemoryHistory()
  const route = '/dashboard/bikes/12345/reservations'
  history.push(route)
  render(
    <Router history={history} >
      <React.StrictMode>
        <ThemeProvider theme={Theme}>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </Router>
  )

  // export redirect back to / when user not authenticated
  expect(screen.getByText('Reserve a Bike for any type of Journey.')).toBeInTheDocument()
  expect(history.location.pathname).toEqual('/')
})


