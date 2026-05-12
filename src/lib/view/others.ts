import {
  OTHERS_SECTIONS,
  type OthersSectionSlug,
} from "../../data/othersSections";
import {
  settingsMaterialImageSrcs,
  type OthersSettingsMaterialEntry,
} from "../others";
import { withBase } from "../urls";

export interface OthersTabItem {
  label: string;
  href: string;
  active: boolean;
}

export interface SettingsMaterialImage {
  src: string;
  alt: string;
}

export const othersTabItems = (
  currentSection: OthersSectionSlug,
): OthersTabItem[] =>
  OTHERS_SECTIONS.map((section) => ({
    label: section.label,
    href: withBase(section.href),
    active: section.slug === currentSection,
  }));

export const settingsCharacterHref = (characterSlug: string): string =>
  withBase(`/others/settings/${characterSlug}`);

export const settingsMaterialImages = (
  entry: OthersSettingsMaterialEntry,
): SettingsMaterialImage[] =>
  settingsMaterialImageSrcs(entry).map((src) => ({
    src,
    alt: entry.data.title,
  }));
