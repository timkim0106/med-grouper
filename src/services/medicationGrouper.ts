
export const groupMedications = (medicationIds: number[], interactions: { [key: string]: number[] }): number[][] => {
  const medicationInteractionMap: { [key: number]: number[] } = interactions;
  const groups: number[][] = [];
  const ungroupedMedications = [...medicationIds];

  while (ungroupedMedications.length > 0) {
    const currentMedication = ungroupedMedications.shift();
    if (currentMedication === undefined) continue;

    let placed = false;
    for (const group of groups) {
      const hasInteraction = group.some(medicationInGroup => {
                const interactionsOfCurrent = medicationInteractionMap[currentMedication] || [];
        const interactionsOfGrouped = medicationInteractionMap[medicationInGroup] || [];
        return interactionsOfCurrent.includes(medicationInGroup) || interactionsOfGrouped.includes(currentMedication);
      });

      if (!hasInteraction) {
        group.push(currentMedication);
        placed = true;
        break;
      }
    }

    if (!placed) {
      groups.push([currentMedication]);
    }
  }

  return groups;
};
