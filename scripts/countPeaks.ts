function countPeaks(values: number[]): number {
  // Write your code here
  // To debug: console.error('Debug messages...');
  let count = 0;
  const threshold = 5;

  for (let i = 1; i < values.length; i++) {
    const diff = values[i] - values[i - 1];

    // Solo consideramos cambios grandes
    if (Math.abs(diff) < threshold) continue;

    // Detectar cambio de tendencia
    if (i >= 2) {
      const prevDiff = values[i - 1] - values[i - 2];
      if (
        Math.abs(prevDiff) >= threshold &&
        Math.sign(diff) !== Math.sign(prevDiff)
      ) {
        count++;
      }
    }
  }

  return count;
}
