
import React from 'react';
import { groupMedications } from '../services/medicationGrouper';

interface Medication {
  id: number;
  name: string;
}

interface Props {
  medicationIds: number[];
  interactions: { [key: string]: number[] };
  medications: Medication[];
}

const MedicationGroups: React.FC<Props> = ({ medicationIds, interactions, medications }) => {
  const groups = groupMedications(medicationIds, interactions);
  const medicationMap = new Map(medications.map(med => [med.id, med.name]));

  return (
    <div>
      {groups.map((group, index) => (
        <div key={index} className="card mb-3">
          <div className="card-header">Group {index + 1}</div>
          <ul className="list-group list-group-flush">
            {group.map(medId => (
              <li key={medId} className="list-group-item">
                {medicationMap.get(medId) || 'Unknown Medication'}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MedicationGroups;
