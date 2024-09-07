import ky from "ky";
import { useLocation, useNavigate } from "react-router-dom";
import { urls } from "./routes";
import { API_BASE_URL as baseUrl } from "./base-url";
import { useMemo } from "react";

export const useHttpClient = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return useMemo(
    () =>
      ky.create({
        prefixUrl: baseUrl,
        timeout: 10000,
        hooks: {
          afterResponse: [
            (_req, _options, res) => {
              // if (500 <= res.status && res.status < 600) {
              //   // navigate(urls.serverError);
              // }
              if (res.status === 401) {
                if (!location.pathname.includes("reset-password")) {
                  navigate(urls.login);
                }
              }
              return res;
            },
          ],
        },
      }),
    [location.pathname, navigate],
  );
};
