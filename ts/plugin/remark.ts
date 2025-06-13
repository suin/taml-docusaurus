import type { Code, Root } from "mdast";
import type { Transformer } from "unified";
import { map } from "unist-util-map";

export function tamlRemarkPlugin(): Transformer {
  return function modifyTreeForTaml(root) {
    return map(root as Root, (node) =>
      node.type === "code"
        ? replaceWithJsxNode(node)
        : node.type === "root"
          ? prependImportNode(node)
          : node,
    );
  };
}

function replaceWithJsxNode(code: Code): Code {
  if (code.lang !== "html" || code.meta !== "taml") {
    return code;
  }
  const tamlCodeString = JSON.stringify(code.value);
  return {
    type: "jsx",
    value: `<Taml>{${tamlCodeString}}</Taml>`,
  } as unknown as Code;
}

function prependImportNode(root: Root): Root {
  root.children.unshift({
    type: "import",
    value: 'import Taml from "@taml/docusaurus/component";',
  } as unknown as Root["children"][number]);
  return root;
}
