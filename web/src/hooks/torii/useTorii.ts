import {QueryKey, useQuery, UseQueryOptions} from "@tanstack/react-query";
import request, {Variables} from "graphql-request";

const TORII_END_POINT = import.meta.env.VITE_TORII_ENDPOINT ?? 'http://localhost:8080/'

const useTorii = <TGqlReturnType>(
  queryKey: QueryKey,
  query: string,
  variables?: Variables,
  queryOptions?: UseQueryOptions<TGqlReturnType, unknown, TGqlReturnType, QueryKey>
) => {
  return useQuery<TGqlReturnType, unknown, TGqlReturnType, QueryKey>({
    queryKey,
    queryFn: async () => request<TGqlReturnType>(TORII_END_POINT, query, variables),
    ...queryOptions
  })
}

export default useTorii