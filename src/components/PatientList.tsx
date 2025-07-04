import React from 'react';

interface Patient {
  id: number;
  name: string;
  medications: number[];
}

interface Props {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
  selectedPatientId: number | null;
}

const PatientList: React.FC<Props> = ({ patients, onSelectPatient, selectedPatientId }) => {
  return (
    <div className="list-group">
      {patients.map(patient => (
        <button
          key={patient.id}
          type="button"
          className={`list-group-item list-group-item-action ${patient.id === selectedPatientId ? 'active' : ''}`}
          onClick={() => onSelectPatient(patient)}
        >
          {patient.name}
        </button>
      ))}
    </div>
  );
};

export default PatientList;