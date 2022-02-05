import api from '@helpers/api.helper';

const createThreatPageService = {
  sendThreatForm: async ({ endpoint, payload }) => {
    const response = await api.post(
      `/api/threat/${endpoint}`,
      { data: payload }
    );
    return response;
  }
};

export default createThreatPageService;
