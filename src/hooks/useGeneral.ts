import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_BASE_URL } from "../config/paths";

export interface Country {
  id: number;
  name: string;
  code: string;
  created_at: string;
  updated_at: string;
}

type ApiResponse<T> = {
  data: T;
};

const fetchCountries = async (): Promise<Country[]> => {
  const response = await axios.get<ApiResponse<Country[]>>(
    `${SERVER_BASE_URL}/auth/countries`,
  );

  return response.data.data;
};

const useFetchCountries = () => {
  return useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    staleTime: 1000 * 60 * 10, // 10 mins (data stays fresh)
    gcTime: 1000 * 60 * 30, // stays in cache for 30 mins
    retry: 2, // retry failed requests twice
    refetchOnWindowFocus: false, // avoid annoying refetches
  });
};

export { useFetchCountries };
