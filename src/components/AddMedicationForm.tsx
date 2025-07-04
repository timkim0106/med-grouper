import React, { useState } from 'react';

interface Medication {
    id: number;
    name: string;
}

interface Props {
  existingMedications: Medication[];
  onAddMedication: (name: string, interactingMedicationIds: number[]) => void;
}

const AddMedicationForm: React.FC<Props> = ({ existingMedications, onAddMedication }) => {
  const [name, setName] = useState('');
  const [selectedInteractions, setSelectedInteractions] = useState<number[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddMedication(name, selectedInteractions);
    setName('');
    setSelectedInteractions([]);
  };

  const handleInteractionChange = (medicationId: number) => {
    setSelectedInteractions(prevSelected =>
      prevSelected.includes(medicationId)
        ? prevSelected.filter(id => id !== medicationId)
        : [...prevSelected, medicationId]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label htmlFor="medicationName" className="form-label">New Medication Name</label>
        <input
          type="text"
          className="form-control"
          id="medicationName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Interacts With</label>
        <div className="border rounded p-2" style={{ maxHeight: '150px', overflowY: 'auto' }}>
          {existingMedications.map(med => (
            <div key={med.id} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={`interaction-${med.id}`}
                checked={selectedInteractions.includes(med.id)}
                onChange={() => handleInteractionChange(med.id)}
              />
              <label className="form-check-label" htmlFor={`interaction-${med.id}`}>
                {med.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Add Medication</button>
    </form>
  );
};

export default AddMedicationForm;