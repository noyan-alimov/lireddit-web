import { dedupExchange, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { betterUpdateQuery } from './betterUpdateQuery';
import { MeDocument } from '../generated/graphql';
import Router from 'next/router';

import { pipe, tap } from 'wonka';
import { Exchange } from 'urql';

const errorExchange: Exchange = ({ forward }) => ops$ => {
	return pipe(
		forward(ops$),
		tap(({ error }) => {
			if (error?.message.includes('not logged in')) {
				Router.replace('/login');
			}
		})
	);
};

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
