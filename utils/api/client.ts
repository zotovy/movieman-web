import axios from "axios";
import EnvHelper from "@/helpers/env-helper";
import AuthHelper from "@/helpers/auth-helper";
import ApiRoutes from "@/utils/api/routes";

const client = axios.create({
    baseURL: EnvHelper.serverUrl,
    headers: {
        "Authorization": AuthHelper.header,
    },
});

const interceptor = client.interceptors.response.use(
  res => res,
  error => {

      console.log(error);

      // Reject promise if usual error
      if (error.response.status !== 401) {
          return Promise.reject(error);
      }

      /*
       * When response code is 401, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes the 401 response
       */
      axios.interceptors.response.eject(interceptor);

      return axios.post(ApiRoutes.updateToken, AuthHelper.tokensBody)
        .then(res => {
            // Save tokens and trying to rerun action
            AuthHelper.tokens = res.data;
            error.response.config.headers["Authorization"] = AuthHelper.header;
            return client(error.response.config);
        })
        .catch(err => {
            AuthHelper.destroyTokens();
            return Promise.reject(error);
        });
  }
);

export default client;
