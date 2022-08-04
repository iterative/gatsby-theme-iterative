import React, {
  useEffect,
  useState,
  useRef,
  ReactNode,
  ReactElement,
  useContext,
  useMemo,
  PropsWithChildren
} from 'react'
import cn from 'classnames'
import { nanoid } from 'nanoid'
import { Element } from 'hast'
import rehypeReact from 'rehype-react'
import Collapsible from 'react-collapsible'

import Main from './Main'
import Link, { NoPreRedirectLink } from '../../Link'
import Tooltip from './Tooltip'
import Admonition from './Admonition'

import * as styles from './styles.module.css'
import { TogglesContext, TogglesProvider } from './ToggleProvider'
import { ReactComponent as LinkIcon } from '../../../images/linkIcon.svg'
import { useLocation } from '@reach/router'

import Slugger from '../../../utils/front/Slugger'
import patchHtmlAst from '../../../utils/front/patchHtmlAst'

type RemarkNode = { props: { children: RemarkNode[] } } | string

const Details: React.FC<
  PropsWithChildren<{ slugger: Slugger; id: string }>
> = ({ slugger, children, id }) => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const filteredChildren = (children as Array<RemarkNode>).filter(
    child => child !== '\n'
  )
  const firstChild = filteredChildren[0] as JSX.Element

  if (!/^h.$/.test(firstChild.type)) {
    throw new Error('The first child of a details element must be a heading!')
  }

  /*
     To work around auto-linked headings, the last child of the heading node
     must be removed. The only way around this is the change the autolinker,
     which we currently have as an external package.
   */
  const triggerChildren: RemarkNode[] = firstChild.props.children.slice(
    0,
    firstChild.props.children.length - 1
  )

  const title = triggerChildren.reduce<string>((acc, cur) => {
    return (acc +=
      typeof cur === 'string'
        ? cur
        : typeof cur === 'object'
        ? cur?.props?.children?.toString()
        : '')
  }, '')
  id = useMemo(() => {
    return id ? slugger.slug(id) : slugger.slug(title)
  }, [id, title])

  useEffect(() => {
    if (location.hash === `#${id}`) {
      setIsOpen(true)
    }

    return () => {
      setIsOpen(false)
    }
  }, [location.hash])

  /*
     Collapsible's trigger type wants ReactElement, so we force a TS cast from
     ReactNode here.
   */
  return (
    <div id={id} className="collapsableDiv">
      <Link
        href={`#${id}`}
        aria-label={triggerChildren.toString()}
        className="anchor after"
      >
        <LinkIcon />
      </Link>
      <Collapsible
        open={isOpen}
        trigger={triggerChildren as unknown as ReactElement}
        transitionTime={200}
      >
        {filteredChildren.slice(1) as ReactNode}
      </Collapsible>
    </div>
  )
}

const Abbr: React.FC<Record<string, never>> = ({ children }) => {
  return <Tooltip text={(children as string[])[0]} />
}

const Cards: React.FC<PropsWithChildren<Record<never, never>>> = ({
  children
}) => {
  return <div className={styles.cards}>{children}</div>
}

const InnerCard: React.FC<
  PropsWithChildren<{
    href?: string
    className?: string
  }>
> = ({ href, children, className }) =>
  href ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <div className={className}>{children}</div>
  )

const Card: React.FC<
  PropsWithChildren<{
    icon?: string
    heading?: string
    href?: string
    headingtag:
      | string
      | React.FC<
          PropsWithChildren<{
            className: string
          }>
        >
  }>
> = ({ children, icon, heading, headingtag: Heading = 'h3', href }) => {
  let iconElement

  if (Array.isArray(children) && icon) {
    const firstRealItemIndex = children.findIndex(x => x !== '\n')
    iconElement = children[firstRealItemIndex]
    children = children.slice(firstRealItemIndex + 1)
  }

  return (
    <div className={styles.cardWrapper}>
      <InnerCard href={href} className={styles.card}>
        {iconElement && <div className={styles.cardIcon}>{iconElement}</div>}
        <div className={styles.cardContent}>
          {heading && (
            <Heading className={styles.cardHeading}>{heading}</Heading>
          )}
          {children}
        </div>
      </InnerCard>
    </div>
  )
}

const ToggleTab: React.FC<
  PropsWithChildren<{
    id: string
    title: string
    ind: number
    onChange: () => void
    checked: boolean
  }>
> = ({ children, id, checked, ind, onChange, title }) => {
  const inputId = `tab-${id}-${ind}`

  return (
    <>
      <input
        id={inputId}
        type="radio"
        name={`toggle-${id}`}
        onChange={onChange}
        checked={checked}
      />
      <label className={styles.tabHeading} htmlFor={inputId}>
        {title}
      </label>
      {children}
    </>
  )
}

const Toggle: React.FC<{
  height?: string
  children: Array<{ props: { title: string } } | string>
}> = ({ height, children }) => {
  const [toggleId, setToggleId] = useState('')
  const {
    addNewToggle = (): null => null,
    updateToggleInd = (): null => null,
    togglesData = {}
  } = useContext(TogglesContext)
  const tabs: Array<{ props: { title: string } } | string> = children.filter(
    child => child !== '\n'
  )
  const tabsTitles = tabs.map(tab =>
    typeof tab === 'object' ? tab.props.title : ''
  )
  const toggleEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tabParent =
      toggleEl.current && toggleEl.current.closest('.toggle .tab')
    const labelParentText =
      tabParent &&
      tabParent.previousElementSibling &&
      tabParent.previousElementSibling.textContent

    if (toggleId === '') {
      const newId = nanoid()
      addNewToggle(newId, tabsTitles, labelParentText)
      setToggleId(newId)
    }

    if (toggleId && !togglesData[toggleId]) {
      addNewToggle(toggleId, tabsTitles, labelParentText)
    }
  }, [togglesData])

  return (
    <div className={cn('toggle', styles.toggle)} ref={toggleEl}>
      {tabs.map((tab, i) => (
        <ToggleTab
          ind={i}
          key={i}
          title={tabsTitles[i]}
          id={toggleId}
          checked={
            i === (togglesData[toggleId] ? togglesData[toggleId].checkedInd : 0)
          }
          onChange={(): void => updateToggleInd(toggleId, i)}
        >
          <div
            className={cn('tab', styles.tab)}
            style={{
              minHeight: height
            }}
          >
            {tab as string}
          </div>
        </ToggleTab>
      ))}
    </div>
  )
}
const Tab: React.FC<PropsWithChildren<Record<never, never>>> = ({
  children
}) => {
  return <React.Fragment>{children}</React.Fragment>
}

// Rehype's typedefs don't allow for custom components, even though they work
const renderAst = (slugger: Slugger) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new (rehypeReact as any)({
    createElement: React.createElement,
    Fragment: React.Fragment,
    components: {
      a: NoPreRedirectLink,
      abbr: Abbr,
      card: Card,
      cards: Cards,
      details: ({ id, children }: PropsWithChildren<{ id: string }>) => (
        <Details slugger={slugger} id={id}>
          {children}
        </Details>
      ),
      toggle: Toggle,
      tab: Tab,
      admon: Admonition,
      admonition: Admonition
    }
  }).Compiler
}

interface IMarkdownProps {
  htmlAst: Element
  githubLink: string
  tutorials?: { [type: string]: string }
  prev?: string
  next?: string
}

const Markdown: React.FC<IMarkdownProps> = ({
  htmlAst,
  prev,
  next,
  tutorials,
  githubLink
}) => {
  const slugger = new Slugger()
  const patchedAst = patchHtmlAst(htmlAst)
  return (
    <Main prev={prev} next={next} tutorials={tutorials} githubLink={githubLink}>
      <TogglesProvider>{renderAst(slugger)(patchedAst)}</TogglesProvider>
    </Main>
  )
}

export default Markdown
