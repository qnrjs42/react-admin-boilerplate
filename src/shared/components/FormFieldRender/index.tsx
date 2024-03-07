import type { ControllerRenderProps } from 'react-hook-form';

import { FormControl, FormItem, FormLabel, FormMessage } from '@shadcn-ui/components/ui/form';
import { Input } from '@shadcn-ui/components/ui/input';

interface IProps<TName extends string> {
  label: string;
  type: React.InputHTMLAttributes<HTMLInputElement>['type'];
  field: ControllerRenderProps<any, TName>;
}
const SharedFormFieldRender = <TName extends string>(props: IProps<TName>) => {
  return (
    <FormItem>
      <FormLabel className='text-[--color-8a92a6]'>{props.label}</FormLabel>
      <FormControl>
        <Input type={props.type} {...props.field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default SharedFormFieldRender;
