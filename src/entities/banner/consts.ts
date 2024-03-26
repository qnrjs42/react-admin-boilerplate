export const BANNER_KEYS = {
  GET_LIST: 'GET_BANNER_LIST',
  CHANGE_RANK_LIST: 'CHANGE_RANK_BANNER_LIST',
  SHOW: 'SHOW_BANNER',
  DELETE: 'DELETE_BANNER',
  GET: 'GET_BANNER',
  MODIFY: 'MODIFY_BANNER',
  CREATE: 'CREATE_BANNER',
} as const;

export const BANNER_LIST_TABLE_HEADERS = [
  '배너 사진',
  '배너명',
  '배너 링크',
  '노출 중지',
  '삭제',
] as const;

export const BANNER_TOAST_MESSAGES = {
  DELETE_SUCCESS: '배너가 정상적으로 삭제되었습니다.',
  DELETE_ERROR: '배너 삭제 처리에 실패했습니다.',
  MODIFY_SUCCESS: '배너가 정상적으로 수정되었습니다.',
  MODIFY_ERROR: '배너 수정 처리에 실패했습니다.',
  CREATE_SUCCESS: '배너가 정상적으로 등록되었습니다.',
  CREATE_ERROR: '배너 등록 처리에 실패했습니다.',
} as const;
