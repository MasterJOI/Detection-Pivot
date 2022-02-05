import { history } from '@helpers/history.helper';

export const checkSidebarShown = () => {
  const sidebarBlackList = ['/login', '/registration']; // добавить endpoints где не будет сайдбара

  return sidebarBlackList.every(item => !history.location.pathname.startsWith(item));
};
