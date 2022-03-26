import MainLayout from '../MainLayout'
import DocumentationLayout from '../DocumentationLayout'
import AlertLandingLayout from '../AlertLandingLayout'

const getLayoutComponent = (props: {
  pageContext: {
    is404: boolean
    isDocs: boolean
    isAlertLanding: boolean
  }
}) => {
  if (!props.pageContext.is404) {
    if (props.pageContext.isDocs) {
      return DocumentationLayout
    } else if (props.pageContext.isAlertLanding) {
      return AlertLandingLayout
    }
  }
  return MainLayout
}

export default getLayoutComponent
