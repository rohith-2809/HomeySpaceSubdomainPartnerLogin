import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api, setTokens, clearTokens, getAccess } from "../api/client";

const AuthContext = createContext();

// Where a partner should land based on their application_status.
export function routeForStatus(status) {
  switch (status) {
    case "verified": return "/dashboard";
    case "submitted":
    case "pending":  return "/status/pending";
    case "draft":
    default:          return "/onboarding/company-profile";
  }
}

export function AuthProvider({ children }) {
  const [partner, setPartner] = useState(null);
  const [status, setStatus] = useState(null);
  const [token, setToken] = useState(getAccess());
  const [loading, setLoading] = useState(true);

  const applyAuth = (data) => {
    if (data.access) { setTokens(data.access, data.refresh); setToken(data.access); }
    if (data.partner) setPartner(data.partner);
    const st = data.application_status || data.partner?.application_status || null;
    if (st) setStatus(st);
    return data;
  };

  const login = useCallback(async (email, password) => {
    const data = await api.post("/auth/partner/login/", { email, password }, { auth: false });
    return applyAuth(data);
  }, []);

  const signup = useCallback(async ({ full_name, email, password, phone }) => {
    const data = await api.post("/auth/partner/signup/", { full_name, email, password, phone }, { auth: false });
    return applyAuth(data);
  }, []);

  // Log in; if the account doesn't exist yet, create it, then continue.
  const loginOrSignup = useCallback(async (email, password) => {
    try {
      return await api.post("/auth/partner/login/", { email, password }, { auth: false }).then(applyAuth);
    } catch (e) {
      if (e.status === 401 || e.status === 400 || e.status === 404) {
        const full_name = email.split("@")[0];
        return await api.post("/auth/partner/signup/", { full_name, email, password, phone: "" }, { auth: false }).then(applyAuth);
      }
      throw e;
    }
  }, []);

  const refreshStatus = useCallback(async () => {
    try {
      const s = await api.get("/partner/registration/status/");
      if (s?.application_status) setStatus(s.application_status);
      return s;
    } catch { return null; }
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    setToken(null); setPartner(null); setStatus(null);
  }, []);

  // On first load, if a token exists, hydrate status + basic partner info.
  useEffect(() => {
    (async () => {
      if (getAccess()) {
        try {
          const st = await api.get("/partner/stats/");
          setPartner((p) => ({ ...(p || {}), ...st }));
          if (st?.application_status) setStatus(st.application_status);
        } catch (e) {
          if (e.status === 401) { clearTokens(); setToken(null); }
        }
      }
      setLoading(false);
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{ partner, status, token, loading, isAuthed: !!token, login, signup, loginOrSignup, refreshStatus, logout, setStatus, setPartner }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
