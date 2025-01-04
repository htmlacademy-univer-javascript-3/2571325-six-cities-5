import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Action } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { extractActionsTypes } from '../../store/actions/actions.test';
import Tabs from './tabs';
import { Cities } from '../../constants/cities';
import { AppThunkDispatch } from '../../store/types';
import { RootState } from '../../store/store';
import { createAPI } from '../../api/api';
import { Actions } from '../../constants/actions';

describe('Tabs', () => {
  const cities = Object.values(Cities);
  const axios = createAPI();
  const mockAPI = new MockAdapter(axios);
  const middlewares = [thunk.withExtraArgument(axios)];
  const mockStore = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middlewares);
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      offers: {
        city: Cities.Paris
      }
    });
    mockAPI.reset();
  });

  it('renders all city tabs', () => {
    render(
      <Provider store={store}>
        <Tabs cities={cities} />
      </Provider>
    );

    cities.forEach((city) => (expect(screen.getByText(city)).toBeInTheDocument()));
  });

  it('dispatches changeCity action when clicking on a city tab', () => {
    render(
      <Provider store={store}>
        <Tabs cities={cities} />
      </Provider>
    );

    fireEvent.click(screen.getByText(Cities.Amsterdam));
    const actions = store.getActions();

    expect(extractActionsTypes(actions)).toEqual([
      Actions.CHANGE_CITY
    ]);
  });

  it('dispatches changeCity with correct city', () => {
    render(
      <Provider store={store}>
        <Tabs cities={cities} />
      </Provider>
    );

    fireEvent.click(screen.getByText(Cities.Amsterdam));
    const actions = store.getActions();

    expect(actions).toEqual([
      expect.objectContaining({
        type: Actions.CHANGE_CITY,
        payload: Cities.Amsterdam,
      }),
    ]);
  });
});
