import { createContext, useContext, useState, useCallback } from "react";
import { api } from "../api/client";

// Carries the 6-step "create project" draft (AddProject -> Location -> Towers ->
// Units -> Review -> Complete) and submits it to POST /partner/builder-projects/.
const ProjectSetupContext = createContext();

const initial = {
  // Step 1 — basics
  cover: null, coverPreview: null,
  name: "", reraNumber: "", projectStatus: "", projectType: "",
  launchDate: "", possessionDate: "", description: "",
  // Step 2 — location
  streetAddress: "", locality: "", landmark: "", pincode: "", city: "", state: "",
  // Step 3 — towers: [{ name, floors, unitsPerFloor }]
  towers: [],
  // Step 4 — configurations: [{ bhk, sizes:[{area,unit}], facing:[], numbering }]
  configurations: [],
  // filled after submit
  createdProjectId: null,
};

// Frontend project-status labels -> backend enum (draft|upcoming|active|completed)
const STATUS_MAP = { pre_launch: "upcoming", under_construction: "active", ready: "completed" };

export function ProjectSetupProvider({ children }) {
  const [data, setData] = useState(initial);
  const patch = useCallback((p) => setData((d) => ({ ...d, ...p })), []);
  const reset = useCallback(() => setData(initial), []);

  const submitProject = useCallback(async () => {
    const d = data;
    const towers = (d.towers || [])
      .filter((t) => t && t.name)
      .map((t) => {
        const floors = Number(t.floors) || 0;
        const upf = Number(t.unitsPerFloor) || 0;
        return { name: t.name, floors, units_per_floor: upf, total_units: floors * upf };
      });
    const unit_configurations = (d.configurations || [])
      .filter((c) => c && c.bhk)
      .map((c) => ({
        unit_type: c.bhk,
        numbering: c.numbering || "",
        facings: c.facing || [],
        sizes: (c.sizes || []).map((s) => ({ carpet_area: String(s.area ?? ""), unit: s.unit || "Sq. Ft.", facing: "" })),
      }));

    const totalUnits = towers.reduce((n, t) => n + (t.total_units || 0), 0);

    const fd = new FormData();
    fd.append("name", d.name || "");
    fd.append("location", [d.locality, d.city].filter(Boolean).join(", "));
    if (d.projectStatus) fd.append("status", STATUS_MAP[d.projectStatus] || "draft");
    fd.append("total_units", String(totalUnits));
    if (d.reraNumber) fd.append("rera_number", d.reraNumber);
    if (d.projectType) fd.append("project_type", d.projectType);
    if (d.launchDate) fd.append("launch_date", d.launchDate);
    if (d.possessionDate) fd.append("possession_date", d.possessionDate);
    if (d.description) fd.append("description", d.description);
    if (d.streetAddress) fd.append("street_address", d.streetAddress);
    if (d.locality) fd.append("locality", d.locality);
    if (d.landmark) fd.append("landmark", d.landmark);
    if (d.pincode) fd.append("pincode", d.pincode);
    if (d.city) fd.append("city", d.city);
    if (d.state) fd.append("state", d.state);
    fd.append("towers", JSON.stringify(towers));
    fd.append("unit_configurations", JSON.stringify(unit_configurations));
    if (d.cover) fd.append("cover_image", d.cover);

    const res = await api.upload("/partner/builder-projects/", fd, { method: "POST" });
    if (res?.id) setData((cur) => ({ ...cur, createdProjectId: res.id }));
    return res;
  }, [data]);

  return (
    <ProjectSetupContext.Provider value={{ data, patch, reset, submitProject }}>
      {children}
    </ProjectSetupContext.Provider>
  );
}

export function useProjectSetup() {
  return useContext(ProjectSetupContext);
}
