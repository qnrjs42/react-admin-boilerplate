import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, type FC } from 'react';
import { FaRegUser } from 'react-icons/fa';

import { useToast } from '@shadcn-ui/hooks';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@shadcn-ui/ui';

import apiAuthGetNickname from '@features/auth/apis/getNickname';
import apiAuthLogout from '@features/auth/apis/logout';

import { AUTH_KEYS } from '@entities/auth/consts';

import { useMeStore } from '@stores';

import { TOAST_DURATION } from '@src/shared/consts/common';
import { STORAGE_KEYS } from '@src/shared/consts/storage';

const HeaderWidget: FC = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const setMe = useMeStore(state => state.setMe);

  const { data: nickname } = useQuery({
    queryKey: [AUTH_KEYS.GET_NICKNAME],
    queryFn: apiAuthGetNickname,
  });

  const handleClearMe = useCallback((): void => {
    // 로컬 스토리지 토큰 제거
    localStorage.removeItem(STORAGE_KEYS.AUTHORIZATION);

    // 유저 정보 제거
    setMe(null);

    // 닉네임 제거
    queryClient.removeQueries({
      queryKey: [AUTH_KEYS.GET_NICKNAME],
    });
  }, [queryClient, setMe]);

  const { mutate: authLogout } = useMutation({
    mutationKey: [AUTH_KEYS.LOGOUT],
    mutationFn: apiAuthLogout,
    onSettled: () => {
      handleClearMe();

      toast({
        title: '로그아웃 되었습니다.',
        duration: TOAST_DURATION.SUCCESS,
      });
    },
  });

  const onClickLogout = (): void => {
    authLogout();
  };

  return (
    <>
      <div className='pointer-events-auto sticky left-0 top-0 z-[2] h-[57px]  translate-x-0 overflow-auto border-b bg-white opacity-[1]  transition-all delay-300 ease-in-out'>
        <div className='flex h-full items-center justify-end gap-4 px-5 py-2'>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className='rounded-full bg-slate-400 p-2'>
                <FaRegUser color='white' />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{nickname}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='cursor-pointer' onClick={onClickLogout}>
                로그아웃
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};

export default HeaderWidget;
