import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { LIST_REGEXP } from '../constants/regexp';

interface IParams {
  routePath: string;
  total?: number;
}
const useChangePage = (params: IParams) => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = useParams();
  const [total, setTotal] = useState<number>(0);

  useEffect((): void => {
    setTotal(prev => (prev === 0 ? params?.total || 0 : prev));
  }, [params?.total]);

  const onChangePage = (page: number): void => {
    const userAllList = params.routePath.replace(LIST_REGEXP, '');

    navigate(`${userAllList}/${page}${location.search}`);
  };

  return { pageSize: 30, currentPage: Number(urlParams?.page || 1), total, onChangePage };
};

export default useChangePage;
