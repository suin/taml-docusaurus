import type { Options } from "@docusaurus/preset-classic";
import type {
  DocusaurusContext,
  Preset,
  PresetConfig,
} from "@docusaurus/types";
import { tamlRemarkPlugin as tamlRemarkPluginV2 } from "./remark-v2.js";
import { tamlRemarkPlugin as tamlRemarkPluginV3 } from "./remark-v3.js";

export interface DocusaurusTamlPresetOptions {
  readonly docusaurusVersion?: undefined | "v2" | "v3";
}

export default function docusaurusTamlPreset(
  context: DocusaurusContext,
  options: DocusaurusTamlPresetOptions = {}
): Preset {
  const docusaurusVersion = options.docusaurusVersion ?? "v3";
  injectRemarkPlugin(context.siteConfig.presets, docusaurusVersion);
  return {};
}

function injectRemarkPlugin(
  presets: Array<PresetConfig>,
  docusaurusVersion: "v2" | "v3"
): void {
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
    const tamlRemarkPlugin =
      docusaurusVersion === "v2" ? tamlRemarkPluginV2 : tamlRemarkPluginV3;
    if (options.docs) {
      options.docs.beforeDefaultRemarkPlugins ??= [];
      options.docs.beforeDefaultRemarkPlugins.unshift([
        tamlRemarkPlugin,
        { params: {} },
      ]);
    }

    if (options.blog) {
      options.blog.beforeDefaultRemarkPlugins ??= [];
      options.blog.beforeDefaultRemarkPlugins.unshift([
        tamlRemarkPlugin,
        { params: {} },
      ]);
    }

    if (options.pages) {
      options.pages.beforeDefaultRemarkPlugins ??= [];
      options.pages.beforeDefaultRemarkPlugins.unshift([
        tamlRemarkPlugin,
        { params: {} },
      ]);
    }
  }
}
