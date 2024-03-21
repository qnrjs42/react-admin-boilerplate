import { useEffect, useState } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shadcn-ui/ui';

import type { ITableDefaultItem } from '@typings/common';

import SortableTable from '../SortableTable';

interface IProps<T> {
  'dialogTitle': string;
  'items': T[];
  'open-button-data-test-id'?: string;
  'sort-button-data-test-id'?: string;
  'onSort'?: (items: T[]) => Promise<void>;
}

const SortableTableDialog = <T extends ITableDefaultItem>(props: IProps<T>) => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [sortingItems, setSortingItems] = useState<T[]>([]);

  useEffect((): void => {
    setSortingItems(props.items as T[]);
  }, [props.items]);

  const onOpenChange = (isOpen: boolean): void => {
    setIsOpenDialog(isOpen);
  };

  const onSubmit = async (): Promise<void> => {
    await props.onSort?.(sortingItems);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpenDialog} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button data-test-id={props['open-button-data-test-id']} variant='outline'>
          순위 변경하기
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle tabIndex={0}>{props.dialogTitle}</DialogTitle>
        </DialogHeader>
        <SortableTable defaultItems={props.items} items={sortingItems} setItems={setSortingItems} />
        <DialogFooter>
          <Button data-test-id={props['sort-button-data-test-id']} onClick={onSubmit}>
            순위 변경하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SortableTableDialog;
