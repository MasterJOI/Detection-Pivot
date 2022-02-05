import api from '@helpers/api.helper';

export const sessionsListPageService = {
  getSessions: async ({ endpoint, payload }) => {
    const response = await api.get(
      `/api/session/${endpoint}`,
      { params: payload }
    );
    return response;
  },
  deleteSession: async ({ endpoint }) => {
    const response = await api.delete(
      `/api/session/delete/${endpoint}`
    );
    return response;
  }
};
