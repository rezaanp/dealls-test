//THIRD PARTY
import useSWR from "swr";
//SERVICES
import { clientGet, serverGet } from "@/services/api";

//TYPES
interface QueryProps {
  skip: number;
  q?: string; //SEARCH PARAMS
}

interface DataProps {
  data: any;
  isLoading: boolean;
  isError: boolean;
}

export async function useGetAllProductsByServer() {
  const URL = `products?limit=100`;
  const data = await serverGet(URL);

  return data;
}

export function useGetAllProductByClient(): DataProps {
  const URL = `products?limit=100`;

  const { data, isLoading, error } = useSWR(URL, clientGet, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data: data?.data,
    isLoading,
    isError: error,
  };
}

export function useGetProductCategories(): DataProps {
  const URL = `products/categories`;

  const { data, isLoading, error } = useSWR(URL, clientGet, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data: data?.data,
    isLoading,
    isError: error,
  };
}

export function useGetProducts(props: QueryProps): DataProps {
  const { skip, q } = props;
  const URL = q
    ? `products/search?q=${q}&skip=${skip}&limit=10`
    : `products?skip=${skip}&limit=10`;

  const { data, isLoading, error } = useSWR(URL, clientGet, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data: data?.data,
    isLoading,
    isError: error,
  };
}

export function useGetCarts(props: QueryProps): DataProps {
  const { skip } = props;
  const URL = `carts?skip=${skip}&limit=10`;

  const { data, isLoading, error } = useSWR(URL, clientGet, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data: data?.data,
    isLoading,
    isError: error,
  };
}

export async function useGetDetailCarts(cartId: number) {
  const URL = `carts/${cartId}`;
  const data = await serverGet(URL);

  return data;
}

export async function useGetUsers() {
  const URL = `users?limit=100`;
  const data = await serverGet(URL);

  return data;
}
