import { createContext, useState, useContext } from "react";
import { api } from "../api/client";

const AssignUnitContext = createContext();

const initialDraftState = {
  projectId: null,
  tower: null,       // { id, name }
  flat: null,        // { id, no, type, facing, size, plan }
  buyer: {
    fullName: "",
    phone: "",
    email: ""
  },
  booking: {
    date: "",
    amount: "",
    notes: ""
  }
};

export function AssignUnitProvider({ children }) {
  const [draftData, setDraftData] = useState(initialDraftState);

  const updateDraft = (section, data) => {
    setDraftData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const setFlatSelection = (projectId, tower, flat) => {
    setDraftData({
      ...initialDraftState,
      projectId,
      tower,
      flat
    });
  };

  const clearDraft = () => {
    setDraftData(initialDraftState);
  };

  // POST the accumulated draft to the backend assign endpoint.
  const submitAssignment = async () => {
    const d = draftData;
    const projectId = d.projectId;
    const unitId = d.flat?.id;
    if (!projectId || !unitId) throw new Error("Missing unit selection.");
    const body = {
      buyer_name: d.buyer?.fullName || "",
      buyer_email: d.buyer?.email || "",
      buyer_phone: d.buyer?.phone || "",
      booking_date: d.booking?.date || "",
      booking_amount: String(d.booking?.amount || "").replace(/[^\d.]/g, ""),
      notes: d.booking?.notes || "",
      super_area: d.flat?.size || "",
      facing: d.flat?.facing || "",
      floor_plan: d.flat?.plan || "",
    };
    return api.post(`/partner/builder-projects/${projectId}/units/${unitId}/assign/`, body);
  };

  return (
    <AssignUnitContext.Provider value={{ draftData, updateDraft, setFlatSelection, clearDraft, submitAssignment }}>
      {children}
    </AssignUnitContext.Provider>
  );
}

export function useAssignUnit() {
  return useContext(AssignUnitContext);
}
