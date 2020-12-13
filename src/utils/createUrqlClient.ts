import { dedupExchange, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { betterUpdateQuery } from './betterUpdateQuery';
import { MeDocument } from '../generated/graphql';

export const createUrqlClient = (ssrExchange: any) => ({
	url: 'http://localhost:4000/graphql',
	fetchOptions: {
		credentials: 'include' as const,
	},
	exchanges: [
		dedupExchange,
		cacheExchange({
			updates: {
				Mutation: {
					logout: (_result, args, cache, info) => {
						betterUpdateQuery(cache, { query: MeDocument }, _result, () => {
							return { me: null };
						});
					},
					login: (_result, args, cache, info) => {
						betterUpdateQuery(
							cache,
							{ query: MeDocument },
							_result,
							(result, query) => {
								if (result.login.errors) {
									return query;
								}
								return {
									me: result.login.user,
								};
							}
						);
					},
					register: (_result, args, cache, info) => {
						betterUpdateQuery(
							cache,
							{ query: MeDocument },
							_result,
							(result, query) => {
								if (result.register.errors) {
									return query;
								}
								return {
									me: result.register.user,
								};
							}
						);
					},
				},
			},
		}),
		ssrExchange,
		fetchExchange,
	],
});
