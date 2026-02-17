"use client";

import { create } from 'zustand';
import { DashboardState } from '@/types';
import { getMockDashboardState } from '@/lib/mockData';

interface DashboardStore extends DashboardState {
    updateMetrics: () => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
    ...getMockDashboardState(),
    updateMetrics: () => {
        set(getMockDashboardState());
    },
}));
