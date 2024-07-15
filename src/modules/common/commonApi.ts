import { api } from '../../api';
import { ExchangeRate } from './commonTypes';

export const commonApi = api.injectEndpoints({
  endpoints: (builder) => ({
    findEthExchangeRate: builder.query<ExchangeRate, { chainId: number }>({
      query: ({ chainId }) => ({ url: `web3/eth-exchange-rate?chainId=${chainId}` }),
    }),
  }),
});

export const { useFindEthExchangeRateQuery } = commonApi;
