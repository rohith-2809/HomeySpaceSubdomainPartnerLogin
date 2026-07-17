import { createContext, useState, useContext } from "react";

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

  return (
    <AssignUnitContext.Provider value={{ draftData, updateDraft, setFlatSelection, clearDraft }}>
      {children}
    </AssignUnitContext.Provider>
  );
}

export function useAssignUnit() {
  return useContext(AssignUnitContext);
}
