import { createContext, useContext, useState, useCallback } from "react";
import { api } from "../api/client";

// Carries the multi-page onboarding form data (company-profile -> basic-info ->
// review) and submits it to the backend registration wizard on confirm.
const OnboardingContext = createContext();

const initial = {
  profile: { logo: null, logoPreview: null, experience: "", projectsCompleted: "", city: "" },
  basic: { companyName: "", gstNumber: "", authorizedPerson: "", emailAddress: "", phoneNumber: "", websiteUrl: "", officeAddress: "" },
};

export function OnboardingProvider({ children }) {
  const [data, setData] = useState(initial);

  const setProfile = useCallback((patch) => setData((d) => ({ ...d, profile: { ...d.profile, ...patch } })), []);
  const setBasic = useCallback((patch) => setData((d) => ({ ...d, basic: { ...d.basic, ...patch } })), []);
  const reset = useCallback(() => setData(initial), []);

  // Maps the collected fields onto the backend's registration steps, then submits.
  const submitOnboarding = useCallback(async () => {
    const { profile, basic } = data;

    // Step 3 — business profile (multipart, may include logo)
    const fd = new FormData();
    if (basic.companyName) fd.append("business_name", basic.companyName);
    if (profile.experience) fd.append("years_of_experience", profile.experience);
    if (profile.projectsCompleted !== "" && profile.projectsCompleted != null)
      fd.append("projects_completed", profile.projectsCompleted);
    if (profile.city) fd.append("city_of_operations", profile.city);
    if (profile.logo) fd.append("business_logo", profile.logo);
    await api.upload("/partner/registration/step/3/", fd, { method: "PUT" });

    // Step 4 — contact & address
    await api.put("/partner/registration/step/4/", {
      authorized_person_name: basic.authorizedPerson,
      work_email: basic.emailAddress,
      phone_number: basic.phoneNumber,
      website_link: basic.websiteUrl,
      office_address: basic.officeAddress,
      gst_number: basic.gstNumber,
    });

    // Step 8 — submit application (draft -> submitted)
    return api.put("/partner/registration/step/8/", {});
  }, [data]);

  return (
    <OnboardingContext.Provider value={{ data, setProfile, setBasic, reset, submitOnboarding }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  return useContext(OnboardingContext);
}
