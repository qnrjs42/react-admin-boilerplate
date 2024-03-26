import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { Form, FormField } from '@shadcn-ui/ui';

import { useImageFiles } from '@hooks';

import { INPUT_TYPE_ATTRIBUTES } from '@constants';

import SharedImageFormFieldRender from '@components/ImageFormFieldRender';

type Story = StoryObj<typeof SharedImageFormFieldRender>;

const meta: Meta<typeof SharedImageFormFieldRender> = {
  title: '@components/SharedImageFormFieldRender',
  component: SharedImageFormFieldRender,
  argTypes: {
    field: {
      control: {
        type: null,
      },
    },
    type: {
      options: INPUT_TYPE_ATTRIBUTES,
      control: { type: 'select' },
    },
  },
  render: args => {
    const form = useForm();
    const { files, setFiles } = useImageFiles();

    return (
      <Form {...form}>
        <form>
          <FormField
            name='imageFiles'
            control={form.control}
            render={({ field }) => (
              <SharedImageFormFieldRender
                {...args}
                field={field}
                files={files}
                setFiles={setFiles}
              />
            )}
          />
        </form>
      </Form>
    );
  },
};

export default meta;

export const Primary: Story = {
  args: {
    label: '이미지 선택 (1장)',
    isRequired: false,
  },
};
