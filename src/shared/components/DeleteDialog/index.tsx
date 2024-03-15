import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shadcn-ui/ui';

interface IDefaultItemProps {
  id: string;
  imageUrl?: string;
  title: string;
}

interface IProps<T> {
  item: T;
  onDelete: (item: T) => () => void;
}

const DeleteDialog = <T extends IDefaultItemProps>({ item, onDelete }: IProps<T>) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='destructive'>삭제</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle tabIndex={0}>{item?.title?.slice?.(0, 100)}</DialogTitle>
        </DialogHeader>
        <div>
          <img src={item?.imageUrl} width={100} height={100} className='mb-4' />
          <span>
            삭제된 데이터는 복구할 수 없습니다. <b>삭제하시겠습니까?</b>
          </span>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='destructive' type='submit' onClick={onDelete(item)}>
              삭제
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
