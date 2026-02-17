// System Metrics
export interface SystemMetric {
    timestamp: number;
    value: number;
}

export interface MetricData {
    current: number;
    history: SystemMetric[];
    predicted: SystemMetric[];
    unit: string;
}

// Dashboard State
export interface DashboardState {
    systemHealth: number;
    aiConfidence: 'high' | 'medium' | 'low';
    failureProbability: number;
    activeModel: string;
    metrics: {
        cpu: MetricData;
        memory: MetricData;
        latency: MetricData;
        errors: MetricData;
        traffic: MetricData;
    };
    driftDetected: boolean;
    driftSeverity: 'none' | 'low' | 'medium' | 'high';
}

// Chart Data
export interface ChartDataPoint {
    time: string;
    value: number;
    predicted?: number;
    normal?: number;
    drift?: number;
}

export type TrendDirection = 'up' | 'down' | 'stable';
export type MetricType = 'cpu' | 'memory' | 'latency' | 'errors' | 'traffic';
export type HealthStatus = 'healthy' | 'warning' | 'critical';
