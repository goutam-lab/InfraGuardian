import { DashboardState, SystemMetric, ChartDataPoint } from "@/types";

// Generate time series data
function generateTimeSeries(
    baseValue: number,
    variance: number,
    points: number,
    drift: boolean = false
): SystemMetric[] {
    const data: SystemMetric[] = [];
    const now = Date.now();

    for (let i = 0; i < points; i++) {
        const timestamp = now - (points - i) * 60000; // 1 minute intervals
        let value = baseValue + (Math.random() - 0.5) * variance;

        // Add drift if enabled (gradual increase)
        if (drift && i > points * 0.6) {
            const driftFactor = (i - points * 0.6) / (points * 0.4);
            value += driftFactor * baseValue * 0.3;
        }

        data.push({ timestamp, value: Math.max(0, value) });
    }

    return data;
}

// Generate predicted future values
function generatePredictions(
    currentValue: number,
    points: number,
    trend: 'up' | 'down' | 'stable'
): SystemMetric[] {
    const data: SystemMetric[] = [];
    const now = Date.now();

    for (let i = 1; i <= points; i++) {
        const timestamp = now + i * 60000; // Future 1 minute intervals
        let value = currentValue;

        if (trend === 'up') {
            value += (i / points) * currentValue * 0.2;
        } else if (trend === 'down') {
            value -= (i / points) * currentValue * 0.15;
        }

        // Add some variance
        value += (Math.random() - 0.5) * currentValue * 0.05;

        data.push({ timestamp, value: Math.max(0, value) });
    }

    return data;
}

// Generate behavioral drift chart data
export function generateDriftData(): ChartDataPoint[] {
    const data: ChartDataPoint[] = [];
    const points = 60;

    for (let i = 0; i < points; i++) {
        const time = `${i}m`;
        const normal = 50 + Math.sin(i / 10) * 10;

        // Introduce drift after 40% of timeline
        let drift = normal;
        if (i > points * 0.4) {
            const driftAmount = ((i - points * 0.4) / (points * 0.6)) * 20;
            drift = normal + driftAmount + Math.random() * 5;
        }

        data.push({
            time,
            normal,
            drift: i > points * 0.4 ? drift : undefined,
            value: i > points * 0.4 ? drift : normal,
        });
    }

    return data;
}

// Mock dashboard state
export function getMockDashboardState(): DashboardState {
    const cpuHistory = generateTimeSeries(65, 15, 60, true);
    const memoryHistory = generateTimeSeries(4.2, 0.8, 60, false);
    const latencyHistory = generateTimeSeries(140, 30, 60, true);
    const errorsHistory = generateTimeSeries(0.03, 0.02, 60, false);
    const trafficHistory = generateTimeSeries(1200, 300, 60, false);

    return {
        systemHealth: 98.7,
        aiConfidence: 'high',
        failureProbability: 0.02,
        activeModel: 'LSTM-V2',
        metrics: {
            cpu: {
                current: cpuHistory[cpuHistory.length - 1].value,
                history: cpuHistory,
                predicted: generatePredictions(cpuHistory[cpuHistory.length - 1].value, 30, 'up'),
                unit: '%',
            },
            memory: {
                current: memoryHistory[memoryHistory.length - 1].value,
                history: memoryHistory,
                predicted: generatePredictions(memoryHistory[memoryHistory.length - 1].value, 30, 'stable'),
                unit: 'GB',
            },
            latency: {
                current: latencyHistory[latencyHistory.length - 1].value,
                history: latencyHistory,
                predicted: generatePredictions(latencyHistory[latencyHistory.length - 1].value, 30, 'down'),
                unit: 'ms',
            },
            errors: {
                current: errorsHistory[errorsHistory.length - 1].value,
                history: errorsHistory,
                predicted: generatePredictions(errorsHistory[errorsHistory.length - 1].value, 30, 'stable'),
                unit: '%',
            },
            traffic: {
                current: trafficHistory[trafficHistory.length - 1].value,
                history: trafficHistory,
                predicted: generatePredictions(trafficHistory[trafficHistory.length - 1].value, 30, 'stable'),
                unit: 'req/s',
            },
        },
        driftDetected: true,
        driftSeverity: 'medium',
    };
}
