import type { ControllerRenderProps } from 'react-hook-form';

import { Input, FormControl, FormItem, FormLabel, FormMessage } from '@shadcn-ui/ui';

interface IProps<TName extends string> extends React.InputHTMLAttributes<HTMLInputElement> {
  type: React.InputHTMLAttributes<HTMLInputElement>['type'];
  field: ControllerRenderProps<any, TName>;
  label?: string;
  isRequired?: boolean;
}
const SharedFormFieldRender = <TName extends string>({
  type,
  field,
  label,
  isRequired,
  ...restProps
}: IProps<TName>) => {
  return (
    <FormItem>
      {label ? (
        <FormLabel>
          {label} {isRequired ? <strong className='required'>*</strong> : ''}
        </FormLabel>
      ) : null}
      <FormControl>
        <Input type={type} {...field} {...restProps} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default SharedFormFieldRender;
