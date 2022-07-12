import React from 'react'
import { Link } from 'gatsby'

export default function Home() {
  return (
    <div className="container px-4 py-10 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-center mb-5">
        Gatsby Theme: Iterative
      </h1>
      <section className="text-lg">
        <p>
          Welcome to the documentation and example website for Iterative&apos;s
          website engine!
        </p>
        <p>
          This theme is primarily related to adding a documentation engine,
          which you can see <Link to="/doc">here!</Link>
        </p>
      </section>
    </div>
  )
}
