import api from '@helpers/api.helper';

export const threatsListPageService = {
  getThreats: async ({ endpoint, payload }) => {
    const response = await api.get(
      `/api/threat/get-list/${endpoint}`,
      { params: payload }
    );
    return response;
  },
  deleteThreat: async ({ endpoint }) => {
    const response = await api.delete(
      `/api/threat/delete/${endpoint}`
    );
    return response;
  },
  addThreatToSession: async ({ endpoint, payload }) => {
    const response = await api.post(
      `/api/session/${endpoint}`,
      { data: payload }
    );
    return response;
  },
  removeThreatFromSession: async ({ endpoint, payload }) => {
    const response = await api.post(
      `/api/session/${endpoint}`,
      { data: payload }
    );
    return response;
  }
};
