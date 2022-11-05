import { useStaticQuery, graphql } from 'gatsby'

interface ISiteMeta {
  title: string
  description: string
  keywords: string
  siteUrl: string
  titleTemplate: string
  plausibleDomain: string
  plausibleSrc: string
}

export default function siteMeta(): ISiteMeta {
  const {
    site: { siteMetadata }
  } = useStaticQuery(
    graphql`
      query SiteMetadata {
        site {
          siteMetadata {
            title
            description
            keywords
            siteUrl
            titleTemplate
            plausibleDomain
            plausibleSrc
          }
        }
      }
    `
  )

  return siteMetadata
}
