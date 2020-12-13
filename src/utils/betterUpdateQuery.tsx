import { QueryInput, Cache } from '@urql/exchange-graphcache';

// function betterUpdateQuery<Result, Query>(
// 	cache: Cache,
// 	qi: QueryInput,
// 	result: any,
// 	fn: (r: Result, q: Query) => Query
// ) {
// 	return cache.updateQuery(qi, data => fn(result, data as any) as any);
// }
export function betterUpdateQuery(
	cache: Cache,
	qi: QueryInput,
	result: any,
	fn: (r: any, q: any) => any
) {
	return cache.updateQuery(qi, data => fn(result, data as any) as any);
}
