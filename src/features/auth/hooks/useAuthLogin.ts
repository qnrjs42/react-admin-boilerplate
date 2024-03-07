import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useToast } from '@shadcn-ui/ui/use-toast';

import { apiAuthLogin } from '@features/auth/apis';

import { type LoginFormDto, LoginFormDtoSchema, AUTH_KEYS } from '@entities/auth';

import { utilAxiosError } from '@utils/utilAxios';

import { ROUTE_PATHS } from '@constants';

const useAuthLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { mutate: login } = useMutation({
    mutationKey: [AUTH_KEYS.LOGIN],
    mutationFn: apiAuthLogin,
    onSuccess: () => {
      navigate(ROUTE_PATHS.ADMIN.DASHBOARD);
    },
    onError: error => {
      toast({
        variant: 'destructive',
        title: '로그인 실패했습니다.',
        description: utilAxiosError(error),
        duration: 3000,
      });
    },
  });

  const form = useForm<LoginFormDto>({
    resolver: zodResolver(LoginFormDtoSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = form.handleSubmit((data: LoginFormDto): void => {
    login(data);
  });

  return { form, onSubmit };
};

export default useAuthLogin;
