import React from 'react'
import { graphql } from 'gatsby'
import { Node } from 'unist'
import { getItemByPath } from '../utils/shared/sidebar'

import SEO from '../components/SEO'

import Documentation from '../components/Documentation'
import { IPageProps } from '../components/Page'
import DocumentationLayout from '../components/Documentation/Layout'
import MainLayout, { LayoutModifiers } from '../components/MainLayout'

interface IDocPageProps extends IPageProps {
  data: {
    page: {
      description?: string
      title?: string
      parent: {
        htmlAst: Node
      }
    }
  }
  location: {
    pathname: string
  }
  pageContext: {
    slug: string
    headings: []
    is404: boolean
    isDocs: boolean
    isAlertLanding: boolean
    pageInfo?: {
      currentPage: number
      nextPage?: string
    }
  }
  children: React.ReactNode
  enableSmoothScroll: boolean
}

const DocPage: React.FC<IDocPageProps> = ({ data, pageContext, location }) => {
  const { slug, headings } = pageContext
  const { pathname } = location
  const {
    page: {
      description,
      title,
      parent: { htmlAst }
    }
  } = data

  const { label } = getItemByPath(slug)

  return (
    <MainLayout
      location={location}
      modifiers={[LayoutModifiers.Wide, LayoutModifiers.Collapsed]}
    >
      <DocumentationLayout currentPath={pathname}>
        <SEO title={title || label} description={description} />
        <Documentation htmlAst={htmlAst} path={slug} headings={headings} />
      </DocumentationLayout>
    </MainLayout>
  )
}

export default DocPage

export const pageQuery = graphql`
  query DocPage($id: String!) {
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
`
