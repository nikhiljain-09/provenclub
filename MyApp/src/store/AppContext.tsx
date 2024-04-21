import React, {createContext, useEffect, useState} from 'react';
import {fetchTrendingGifs, getTrendingGifsBySearch} from '../api';
import {useColorScheme} from 'react-native';
import customHook from './customHook';

interface ContextType {
  data?: ApiRespoonse;
  error?: string | null | undefined;
  loading: boolean;
  isDarkTheme: boolean;
  bottomLoading: boolean;
  getTrendingGifs(offset: number): Promise<void>;
  fetchTrendingGifsBySearch(text: string): Promise<void>;
}

export const AppContext = createContext<ContextType>({
  loading: false,
  bottomLoading: false,
  isDarkTheme: false,
  getTrendingGifs: function (_: number): Promise<void> {
    throw new Error('Function not implemented.');
  },
  fetchTrendingGifsBySearch: function (_: string): Promise<void> {
    throw new Error('Function not implemented.');
  },
});

interface ApiRespoonse {
  data: {title: string; id: string}[];
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
}

const App = ({children}: {children: React.ReactElement}) => {
  const [trendingGifs, setTrendingGifs] = useState<ApiRespoonse>();
  const [error, setError] = useState<string | null | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [bottomLoading, setBottomLoading] = useState<boolean>(false);
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  async function getTrendingGifs(offset: number) {
    try {
      if (offset > 0) {
        setBottomLoading(true);
      }
      const data = await fetchTrendingGifs(offset);
      if (offset > 0) {
        setTrendingGifs(prev => {
          return {
            data: prev?.data.concat([...data?.data?.data]) as {
              title: string;
              id: string;
            }[],
            pagination: data?.data?.pagination,
          };
        });
      } else {
        setTrendingGifs(data?.data);
      }

      if (error) {
        setError(null);
      }
    } catch (error: any) {
      setError(error?.message);
    } finally {
      if (offset > 0) {
        setBottomLoading(false);
      } else {
        setLoading(false);
      }
    }
  }

  async function fetchTrendingGifsBySearch(text: string) {
    try {
      setLoading(true);
      const data = await getTrendingGifsBySearch(text);
      setTrendingGifs(data?.data);
    } catch (error: any) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTrendingGifs(0);
  }, []);

  return (
    <AppContext.Provider
      value={{
        isDarkTheme,
        bottomLoading,
        getTrendingGifs,
        fetchTrendingGifsBySearch,
        error,
        loading,
        data: trendingGifs,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default App;
