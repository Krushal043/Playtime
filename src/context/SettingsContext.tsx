'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StoreSettingsMap,
  MarqueeItemConfig,
  ReviewItemConfig,
  FaqItemConfig,
  TimelineStepConfig,
  StandardCardConfig,
  FooterConfig,
  DEFAULT_MARQUEE_ITEMS,
  DEFAULT_FAQS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_TIMELINE_STEPS,
  DEFAULT_STANDARDS_GRID,
  DEFAULT_FOOTER_CONFIG,
} from '@/types/cms';

interface SettingsContextType {
  settings: StoreSettingsMap;
  marqueeItems: MarqueeItemConfig[];
  faqs: FaqItemConfig[];
  testimonials: ReviewItemConfig[];
  timelineSteps: TimelineStepConfig[];
  standardsGrid: StandardCardConfig[];
  footerConfig: FooterConfig;
  loading: boolean;
  refreshSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: {},
  marqueeItems: DEFAULT_MARQUEE_ITEMS,
  faqs: DEFAULT_FAQS,
  testimonials: DEFAULT_TESTIMONIALS,
  timelineSteps: DEFAULT_TIMELINE_STEPS,
  standardsGrid: DEFAULT_STANDARDS_GRID,
  footerConfig: DEFAULT_FOOTER_CONFIG,
  loading: true,
  refreshSettings: async () => {},
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<StoreSettingsMap>({});
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.success && data.settings) {
        setSettings(data.settings);
      }
    } catch (err) {
      console.warn('Could not load dynamic settings, using default fallbacks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const marqueeItems = settings.marquee_items !== undefined
    ? settings.marquee_items
    : DEFAULT_MARQUEE_ITEMS;

  const faqs = settings.faqs !== undefined
    ? settings.faqs
    : DEFAULT_FAQS;

  const testimonials = settings.testimonials !== undefined
    ? settings.testimonials
    : DEFAULT_TESTIMONIALS;

  const timelineSteps = settings.timeline_steps !== undefined
    ? settings.timeline_steps
    : DEFAULT_TIMELINE_STEPS;

  const standardsGrid = settings.standards_grid !== undefined
    ? settings.standards_grid
    : DEFAULT_STANDARDS_GRID;

  const footerConfig = settings.footer_config || DEFAULT_FOOTER_CONFIG;

  return (
    <SettingsContext.Provider
      value={{
        settings,
        marqueeItems,
        faqs,
        testimonials,
        timelineSteps,
        standardsGrid,
        footerConfig,
        loading,
        refreshSettings: fetchSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
