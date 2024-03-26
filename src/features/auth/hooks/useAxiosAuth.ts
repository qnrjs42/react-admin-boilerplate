import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useLayoutEffect, useState } from 'react';

import apiAuthCertify from '@features/auth/apis/certify';

import { AUTH_KEYS } from '@entities/auth/constants';

import { useMeStore } from '@stores';

import { STORAGE_KEYS } from '@constants';

const useAxiosAuth = () => {
  const { me, setMe } = useMeStore();

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const { mutate: authCertify } = useMutation({
    mutationKey: [AUTH_KEYS.CERTIFY],
    mutationFn: apiAuthCertify,
    onSuccess: newMe => {
      setMe(newMe);
    },
    onError: () => {
      localStorage.removeItem(STORAGE_KEYS.AUTHORIZATION);
      setMe(null);
    },
    onSettled: () => {
      setIsLoaded(true);
    },
  });

  useLayoutEffect(() => {
    const authorization = localStorage.getItem(STORAGE_KEYS.AUTHORIZATION);

    authCertify(authorization || '');
  }, [authCertify]);

  useLayoutEffect(() => {
    const requestInterceptor = axios.interceptors.request.use();

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return {
    me,
    isLoadedCertify: isLoaded,
  };
};

export default useAxiosAuth;
