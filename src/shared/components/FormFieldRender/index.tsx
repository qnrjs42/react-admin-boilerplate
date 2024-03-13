import type { ControllerRenderProps } from 'react-hook-form';

import { Input, FormControl, FormItem, FormLabel, FormMessage } from '@shadcn-ui/ui';

interface IProps<TName extends string> {
  type: React.InputHTMLAttributes<HTMLInputElement>['type'];
  field: ControllerRenderProps<any, TName>;
  label?: string;
}
const SharedFormFieldRender = <TName extends string>(props: IProps<TName>) => {
  return (
    <FormItem>
      {props.label ? <FormLabel>{props.label}</FormLabel> : null}
      <FormControl>
        <Input type={props.type} {...props.field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default SharedFormFieldRender;
