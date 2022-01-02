import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface Image {
  description: string;
  id: string;
  title: string;
  ts: number;
  url: string;
}

interface ResponseApiImages {
  after: null | string;
  data: Image[];
}

export default function Home(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function fetchImages({ pageParam = null }) {
    const { data } = await api.get<ResponseApiImages>('/api/images', {
      params: { pageParam },
    });

    return data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARAM
    fetchImages

    // TODO GET AND RETURN NEXT PAGE PARAM
  );

  console.log(data);

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY

    return data.pages.map(page => page.data).flat();
  }, [data]);

  console.log(formattedData);

  // TODO RENDER LOADING SCREEN

  // TODO RENDER ERROR SCREEN

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
      </Box>
    </>
  );
}
