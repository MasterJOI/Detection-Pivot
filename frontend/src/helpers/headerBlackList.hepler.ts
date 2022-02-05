import { history } from '@helpers/history.helper';

export const checkHeaderShown = () => {
  const headerBlackList = ['/login', '/registration']; // добавить endpoints где не будет заголовка

  return headerBlackList.every(item => !history.location.pathname.startsWith(item));
};
