import path from "path";
import remark from "remark";

async function onCreateNode(
  {
    node,
    getNode,
    createNodeId,
    createContentDigest,
    actions: { createNode, createParentChildLink },
  },
  { disable }
) {
  if (disable || node.internal.type !== "MarkdownRemark") {
    return;
  }

  console.log(remark);

  const parentNode = getNode(node.parent);
  const splitDir = parentNode.relativeDirectory.split(path.sep);
  if (splitDir[0] !== "docs") return;

  const { name, relativePath } = parentNode;
  splitDir[0] = "doc";

  const slug = path.posix.join("/", ...splitDir, name === "index" ? "" : name);

  const fieldData = {
    slug,
    sourcePath: relativePath,
    template: node.frontmatter.template,
    title: node.frontmatter.title === "" ? null : node.frontmatter.title,
    description: node.frontmatter.description,
  };

  const docNode = {
    ...fieldData,
    id: createNodeId(`MarkdownDocsPage >>> ${node.id}`),
    parent: node.id,
    children: [],
    internal: {
      type: `DocsPage`,
      contentDigest: createContentDigest(fieldData),
    },
  };

  createNode(docNode);
  createParentChildLink({ parent: node, child: docNode });

  // Glossary

  if (parentNode.relativeDirectory !== "docs/user-guide/basic-concepts") return;

  const {
    frontmatter: { name: frontmatterName, match, tooltip },
  } = node;

  console.log(frontmatterName, match, tooltip);
  const glossaryFieldData = {
    name: frontmatterName,
    match,
    tooltip: tooltip,
  };
  console.log("GLOSSARY");

  const entryNode = {
    ...glossaryFieldData,
    id: createNodeId(`DVCGlossaryEntry >>> ${node.id}`),
    parent: node.id,
    children: [],
    internal: {
      type: `GlossaryEntry`,
      contentDigest: createContentDigest(glossaryFieldData),
    },
  };

  console.log(entryNode);
}

module.exports = onCreateNode;
