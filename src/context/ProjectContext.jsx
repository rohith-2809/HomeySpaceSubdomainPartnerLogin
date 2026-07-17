import { createContext, useState, useContext } from "react";

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([
    {
      id: "vasavi-skies",
      name: "Vasavi Skies",
      location: "Madhapur, Hyderabad",
      totalUnits: 300,
      soldUnits: 124,
      availableUnits: 176,
      status: "Active",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      towers: [
        {
          id: "tower-a",
          name: "Tower A",
          totalUnits: 150,
          soldUnits: 70,
          availableUnits: 80,
          floors: [
            {
              floorNumber: 2,
              units: [
                { id: "201", no: "201", type: "3 BHK", facing: "East", status: "available", size: "1,450 sq.ft", plan: "3 BHK Premium" },
                { id: "202", no: "202", type: "3 BHK", facing: "North", status: "booked", size: "1,450 sq.ft", plan: "3 BHK Premium" },
                { id: "203", no: "203", type: "2 BHK", facing: "East", status: "available", size: "1,250 sq.ft", plan: "2 BHK Elite" },
                { id: "204", no: "204", type: "2 BHK", facing: "West", status: "available", size: "1,250 sq.ft", plan: "2 BHK Elite" },
                { id: "205", no: "205", type: "3 BHK", facing: "East", status: "available", size: "1,800 sq.ft", plan: "3 BHK Luxury" },
                { id: "206", no: "206", type: "3 BHK", facing: "North", status: "booked", size: "1,800 sq.ft", plan: "3 BHK Luxury" },
                { id: "207", no: "207", type: "2 BHK", facing: "East", status: "booked", size: "1,250 sq.ft", plan: "2 BHK Elite" },
                { id: "208", no: "208", type: "2 BHK", facing: "West", status: "available", size: "1,250 sq.ft", plan: "2 BHK Elite" },
              ]
            },
            {
              floorNumber: 1,
              units: [
                { id: "101", no: "101", type: "3 BHK", facing: "East", status: "booked", size: "1,450 sq.ft", plan: "3 BHK Premium" },
                { id: "102", no: "102", type: "3 BHK", facing: "North", status: "booked", size: "1,450 sq.ft", plan: "3 BHK Premium" },
                { id: "103", no: "103", type: "2 BHK", facing: "East", status: "available", size: "1,250 sq.ft", plan: "2 BHK Elite" },
                { id: "104", no: "104", type: "2 BHK", facing: "West", status: "available", size: "1,250 sq.ft", plan: "2 BHK Elite" },
                { id: "105", no: "105", type: "3 BHK", facing: "East", status: "available", size: "1,800 sq.ft", plan: "3 BHK Luxury" },
                { id: "106", no: "106", type: "3 BHK", facing: "North", status: "available", size: "1,800 sq.ft", plan: "3 BHK Luxury" },
                { id: "107", no: "107", type: "2 BHK", facing: "East", status: "available", size: "1,250 sq.ft", plan: "2 BHK Elite" },
                { id: "108", no: "108", type: "2 BHK", facing: "West", status: "available", size: "1,250 sq.ft", plan: "2 BHK Elite" },
              ]
            }
          ]
        },
        {
          id: "tower-b",
          name: "Tower B",
          totalUnits: 150,
          soldUnits: 54,
          availableUnits: 96,
          floors: [
            {
              floorNumber: 1,
              units: [
                { id: "101b", no: "101", type: "2 BHK", facing: "North", status: "available", size: "1,250 sq.ft", plan: "2 BHK Elite" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "godrej-summit",
      name: "Godrej Summit",
      location: "Gachibowli, Hyderabad",
      totalUnits: 200,
      soldUnits: 0,
      availableUnits: 200,
      status: "Draft",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
      towers: []
    }
  ]);

  const assignUnit = (projectId, towerId, flatId) => {
    setProjects(prevProjects => {
      return prevProjects.map(proj => {
        if (proj.id !== projectId) return proj;

        // Clone project
        const updatedProj = { ...proj, soldUnits: proj.soldUnits + 1, availableUnits: proj.availableUnits - 1 };

        updatedProj.towers = updatedProj.towers.map(tower => {
          if (tower.id !== towerId) return tower;

          // Clone tower
          const updatedTower = { ...tower, soldUnits: tower.soldUnits + 1, availableUnits: tower.availableUnits - 1 };

          updatedTower.floors = updatedTower.floors.map(floor => {
            return {
              ...floor,
              units: floor.units.map(unit => {
                if (unit.id !== flatId) return unit;
                return { ...unit, status: "booked" };
              })
            };
          });

          return updatedTower;
        });

        return updatedProj;
      });
    });
  };

  const getProject = (id) => projects.find(p => p.id === id);

  return (
    <ProjectContext.Provider value={{ projects, assignUnit, getProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  return useContext(ProjectContext);
}
