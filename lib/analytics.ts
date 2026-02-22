// lib/analytics.ts
export const calculateDrift = (actual: number, baseline: number) => {
  const divergence = Math.abs(actual - baseline);
  const threshold = baseline * 0.4; // 40% deviation is considered "Drift"
  
  return {
    isDrifting: divergence > threshold,
    severity: divergence > baseline ? 'CRITICAL' : (divergence > threshold ? 'WARNING' : 'STABLE'),
    percentage: (divergence / baseline) * 100
  };
};