import { useState } from 'react';

import type { FileWithDropzone } from '@typings';

const useImageFiles = (initialFiles?: FileWithDropzone[]) => {
  const [files, setFiles] = useState<FileWithDropzone[]>(initialFiles || []);
  return { files, setFiles };
};

export default useImageFiles;
