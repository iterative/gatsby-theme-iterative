/* eslint-env node */
const React = require('react')

const PageWrapper = require('./src/components/PageWrapper').default

exports.wrapPageElement = PageWrapper

const onRenderBody = ({ setHeadComponents }, { plausibleSrc }) => {
  if (plausibleSrc) {
    return setHeadComponents([
      <script
        key="plausible-custom-events"
        dangerouslySetInnerHTML={{
          __html:
            'window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }'
        }}
      />
    ])
  }
}

exports.onRenderBody = onRenderBody
