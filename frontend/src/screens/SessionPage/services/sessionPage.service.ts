import api from '@helpers/api.helper';

const sessionPageService = {
  sendIsSnifferOn: async ({ endpoint, payload }) => {
    const response = await api.post(
      `/api/sniffer/${endpoint}`,
      { data: payload }
    );
    return response;
  },
  sendSessionForm: async ({ endpoint, payload }) => {
    const response = await api.post(
      `/api/session/${endpoint}`,
      { data: payload }
    );
    return response;
  },
  getInterfaces: async ({ endpoint }) => {
    const response = await api.get(
      `/api/interfaces/${endpoint}`
    );
    return response;
  },
  getCurrentSession: async ({ endpoint }) => {
    const response = await api.get(
      `/api/session/${endpoint}`
    );
    return response;
  },
  closeSession: async ({ endpoint }) => {
    const response = await api.post(
      `/api/session/close/${endpoint}`
    );
    return response;
  }
};

export default sessionPageService;
