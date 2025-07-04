

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PatientList from './components/PatientList';
import MedicationGroups from './components/MedicationGroups';
import AddPatientForm from './components/AddPatientForm';
import AddMedicationForm from './components/AddMedicationForm';
import initialPatients from './data/patients.json';
import initialMedications from './data/medications.json';
import initialInteractions from './data/interactions.json';

interface Patient {
  id: number;
  name: string;
  medications: number[];
}

interface Medication {
  id: number;
  name: string;
}

interface Interactions {
  [key: string]: number[];
}

function App() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [medications, setMedications] = useState<Medication[]>(initialMedications);
  const [interactions, setInteractions] = useState<Interactions>(initialInteractions);

  const handleAddPatient = (name: string, medicationIds: number[]) => {
    const newPatient: Patient = {
      id: Date.now(),
      name,
      medications: medicationIds,
    };
    setPatients([...patients, newPatient]);
  };

  const handleAddMedication = (name: string, interactingMedicationIds: number[]) => {
    const newMedication: Medication = {
      id: Date.now(),
      name,
    };
    const updatedMedications = [...medications, newMedication];
    setMedications(updatedMedications);

    const newInteractions = { ...interactions };
    newInteractions[newMedication.id.toString()] = interactingMedicationIds;
    interactingMedicationIds.forEach(id => {
      const idStr = id.toString();
      if (!newInteractions[idStr]) {
        newInteractions[idStr] = [];
      }
      newInteractions[idStr].push(newMedication.id);
    });
    setInteractions(newInteractions);
  };

  useEffect(() => {
    if (selectedPatient) {
      const updatedPatient = patients.find(p => p.id === selectedPatient.id) || null;
      setSelectedPatient(updatedPatient);
    }
  }, [patients, selectedPatient]);

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <i className="fas fa-pills me-2"></i>
            MedScheduler
          </a>
        </div>
      </nav>

      <div className="container-fluid p-4">
        <div className="row g-4">
          {/* Left Column: Patient & Medication Management */}
          <div className="col-lg-4">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h2 className="card-title">Patients</h2>
                <PatientList patients={patients} onSelectPatient={setSelectedPatient} selectedPatientId={selectedPatient?.id || null} />
              </div>
            </div>
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="card-title">Management</h2>
                <div className="accordion" id="managementAccordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                        Add New Patient
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#managementAccordion">
                      <div className="accordion-body">
                        <AddPatientForm medications={medications} onAddPatient={handleAddPatient} />
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Add New Medication
                      </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#managementAccordion">
                      <div className="accordion-body">
                        <AddMedicationForm existingMedications={medications} onAddMedication={handleAddMedication} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Medication Groups */}
          <div className="col-lg-8">
            {selectedPatient ? (
              <div className="card shadow-sm">
                <div className="card-body">
                  <h2 className="card-title">{selectedPatient.name}'s Medication Plan</h2>
                  <MedicationGroups
                    medicationIds={selectedPatient.medications}
                    interactions={interactions}
                    medications={medications}
                  />
                </div>
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center h-100">
                <div className="alert alert-light text-center" role="alert">
                  <i className="fas fa-arrow-left me-2"></i>
                  Select a patient to view their medication schedule.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

