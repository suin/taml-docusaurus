import type { BlockContent, Code, Root } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx-jsx";
import type { MdxjsEsm } from "mdast-util-mdxjs-esm";
import type { Transformer } from "unified";
import { map } from "unist-util-map";

export function tamlRemarkPlugin(): Transformer {
  return function modifyTreeForTaml(root) {
    return map(root as Root, (node) => {
      if (node.type === "code") {
        return replaceWithJsxNode(node);
      }
      if (node.type === "root") {
        return prependImportNode(node);
      }
      return node;
    });
  };
}

function replaceWithJsxNode(code: Code): Code | MdxJsxFlowElement {
  if (code.lang !== "taml") {
    return code;
  }
  return {
    type: "mdxJsxFlowElement",
    name: "Taml",
    attributes: [],
    children: [
      {
        type: "text",
        value: code.value,
      } as unknown as BlockContent,
    ],
  };
}

function prependImportNode(root: Root): Root {
  root.children.unshift({
    type: "mdxjsEsm",
    value: 'import Taml from "@taml/docusaurus/component";',
    data: {
      estree: {
        type: "Program",
        body: [
          {
            type: "ImportDeclaration",
            attributes: [],
            specifiers: [
              {
                type: "ImportDefaultSpecifier",
                local: {
                  type: "Identifier",
                  name: "Taml",
                },
              },
            ],
            source: {
              type: "Literal",
              value: "@taml/docusaurus/component",
            },
          },
        ],
        sourceType: "module",
        comments: [],
      },
    },
  } satisfies MdxjsEsm);
  return root;
}
