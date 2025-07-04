
import React, { useState } from 'react';

interface Medication {
    id: number;
    name: string;
}

interface Props {
  medications: Medication[];
  onAddPatient: (name: string, medicationIds: number[]) => void;
}

const AddPatientForm: React.FC<Props> = ({ medications, onAddPatient }) => {
  const [name, setName] = useState('');
  const [selectedMedications, setSelectedMedications] = useState<number[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddPatient(name, selectedMedications);
    setName('');
    setSelectedMedications([]);
  };

  const handleMedicationChange = (medicationId: number) => {
    setSelectedMedications(prevSelected =>
      prevSelected.includes(medicationId)
        ? prevSelected.filter(id => id !== medicationId)
        : [...prevSelected, medicationId]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label htmlFor="patientName" className="form-label">Patient Name</label>
        <input
          type="text"
          className="form-control"
          id="patientName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Medications</label>
        <div className="border rounded p-2" style={{ maxHeight: '150px', overflowY: 'auto' }}>
          {medications.map(med => (
            <div key={med.id} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={`med-${med.id}`}
                checked={selectedMedications.includes(med.id)}
                onChange={() => handleMedicationChange(med.id)}
              />
              <label className="form-check-label" htmlFor={`med-${med.id}`}>
                {med.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Add Patient</button>
    </form>
  );
};

export default AddPatientForm;
