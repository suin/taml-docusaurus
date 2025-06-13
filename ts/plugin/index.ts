import type { Options } from "@docusaurus/preset-classic";
import type {
  DocusaurusContext,
  Preset,
  PresetConfig,
} from "@docusaurus/types";
import { tamlRemarkPlugin } from "./remark.js";

export default function docusaurusTamlPreset(
  context: DocusaurusContext,
): Preset {
  injectRemarkPlugin(context.siteConfig.presets);
  return {
    plugins: [tamlRemarkPlugin],
  };
}

function injectRemarkPlugin(presets: Array<PresetConfig>): void {
  for (const preset of presets) {
    // preset can be a string, a false, a null, or an array
    if (!Array.isArray(preset)) {
      continue;
    }

    // we only care about the classic preset
    if (preset[0] !== "classic") {
      continue;
    }

    const options = preset[1] as Options;

    if (options.docs) {
      options.docs.beforeDefaultRemarkPlugins ??= [];
      options.docs.beforeDefaultRemarkPlugins.unshift(tamlRemarkPlugin);
    }

    if (options.blog) {
      options.blog.beforeDefaultRemarkPlugins ??= [];
      options.blog.beforeDefaultRemarkPlugins.unshift(tamlRemarkPlugin);
    }

    if (options.pages) {
      options.pages.beforeDefaultRemarkPlugins ??= [];
      options.pages.beforeDefaultRemarkPlugins.unshift(tamlRemarkPlugin);
    }
  }
}
