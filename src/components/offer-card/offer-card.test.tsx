import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Action } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import OfferCard from './offer-card';
import { AuthorizationStatus } from '../../constants/auth';
import { vi } from 'vitest';
import { offersMock } from '../../mocks/offers';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '../../store/store';
import { AppThunkDispatch } from '../../store/types';
import { createAPI } from '../../api/api';
import { extractActionsTypes } from '../../store/actions/actions.test';
import { Actions } from '../../constants/actions';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('OfferCard', () => {
  const axios = createAPI();
  const middlewares = [thunk.withExtraArgument(axios)];
  const mockStore = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middlewares);
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockOffer = offersMock[0];
  const mockSetHoverOfferId = vi.fn();

  beforeEach(() => {
    store = mockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.Auth
      }
    });
  });

  it('renders offer card correctly', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <OfferCard offer={mockOffer} setOnHoverOfferId={mockSetHoverOfferId} />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
  });

  it('handles hover events', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <OfferCard offer={mockOffer} setOnHoverOfferId={mockSetHoverOfferId} />
        </Provider>
      </MemoryRouter>
    );

    const card = screen.getByTestId('offer-card');
    fireEvent.mouseOver(card);
    expect(mockSetHoverOfferId).toHaveBeenCalledWith(mockOffer.id);

    fireEvent.mouseOut(card);
    expect(mockSetHoverOfferId).toHaveBeenCalledWith(null);
  });

  it('dispatches changeOfferStatus when bookmark button clicked', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <OfferCard offer={mockOffer} />
        </Provider>
      </MemoryRouter>
    );

    const bookmarkButton = screen.getByRole('button');
    fireEvent.click(bookmarkButton);

    const actions = store.getActions();
    expect(extractActionsTypes(actions)).toEqual([
      `${Actions.CHANGE_OFFER_STATUS}/pending`
    ]);
  });
});
