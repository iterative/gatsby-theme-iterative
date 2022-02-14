import React from "react";
import { graphql } from "gatsby";
import { Node } from "unist";
import { getItemByPath } from "gatsby-theme-iterative-docs/src/utils/shared/sidebar";

import SEO from "gatsby-theme-iterative-docs/src/components/SEO";

import DocumentationLayout from "gatsby-theme-iterative-docs/src/components/Documentation/Layout";
import Documentation from "gatsby-theme-iterative-docs/src/components/Documentation";

interface IDocPageProps {
  data: {
    page: {
      description?: string;
      title?: string;
      parent: {
        htmlAst: Node;
      };
    };
  };
  pageContext: {
    slug: string;
    headings: [];
  };
}

const DocPage: React.FC<IDocPageProps> = ({
  data,
  pageContext: { slug, headings },
}) => {
  const {
    page: {
      description,
      title,
      parent: { htmlAst },
    },
  } = data;

  const { label } = getItemByPath(slug);

  return (
    <>
      <SEO title={title || label} description={description} />
      <DocumentationLayout currentPath={slug}>
        <Documentation htmlAst={htmlAst} path={slug} headings={headings} />
      </DocumentationLayout>
    </>
  );
};

export default DocPage;

export const pageQuery = graphql`
  query OurDocPage($id: String!) {
    page: docsPage(id: { eq: $id }) {
      description
      title
      parent {
        ... on MarkdownRemark {
          htmlAst
        }
      }
    }
  }
`;
