import type { FC } from 'react';

interface IProps {
  children: React.ReactNode;
}
const PageContainer: FC<IProps> = ({ children }) => {
  return <div className='rounded-lg bg-white p-6'>{children}</div>;
};

export default PageContainer;
