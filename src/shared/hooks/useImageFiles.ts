import { useState } from 'react';

import type { FileWithDropzone } from '@typings/common';

const useImageFiles = () => {
  const [files, setFiles] = useState<FileWithDropzone[]>([]);
  return { files, setFiles };
};

export default useImageFiles;
