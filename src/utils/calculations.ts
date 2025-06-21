export function calculateRowTotal(gridPositions: any[], rowIndex: number): number {
  const startIndex = rowIndex * 6;
  const rowPositions = gridPositions.slice(startIndex + 1, startIndex + 6);
  
  // First pass: Calculate total without Aces
  let total = 0;
  const aces: any[] = [];
  
  rowPositions.forEach(position => {
    if (!position) return;
    if (position.card.rank === 'A') {
      aces.push(position);
    } else {
      total += position.card.value;
    }
  });

  // Second pass: Add Aces with appropriate values
  aces.forEach(ace => {
    if (total <= 10) {
      total += 11;
    } else {
      total += 1;
    }
  });

  return total;
}

export function calculateColumnTotal(gridPositions: any[], colIndex: number): number {
  const columnPositions = Array.from({ length: 5 }, (_, row) => gridPositions[(row + 1) * 6 + colIndex]);
  
  // First pass: Calculate total without Aces
  let total = 0;
  const aces: any[] = [];
  
  columnPositions.forEach(position => {
    if (!position) return;
    if (position.card.rank === 'A') {
      aces.push(position);
    } else {
      total += position.card.value;
    }
  });

  // Second pass: Add Aces with appropriate values
  aces.forEach(ace => {
    if (total <= 10) {
      total += 11;
    } else {
      total += 1;
    }
  });

  return total;
}

export function getTotalSpaceImage(total: number): string {
  if (total === 21) return "/images/21-stackem-total-space-green.png";
  if (total > 21) return "/images/21-stackem-total-space-red.png";
  return "/images/21-stackem-total-space.png";
}