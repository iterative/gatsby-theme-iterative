import React from 'react'
import { Link } from 'gatsby'

export default function Home() {
  return (
    <div className="container px-2 py-3 mx-auto" style={{ height: 1000 }}>
      <h1 className="text-xl font-bold text-center mb-2">
        Gatsby Theme: Iterative
      </h1>
      <p>
        Welcome to the documentation and example website for Iterative&apos;s
        website engine!
      </p>
      <p>
        This theme is primarily related to adding a documentation engine, which
        you can see <Link to="/doc">here!</Link>
      </p>
    </div>
  )
}
