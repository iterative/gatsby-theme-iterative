import React from 'react'
import cn from 'classnames'
import { PageProps } from 'gatsby'
import MainLayout from '@dvcorg/gatsby-theme-iterative/src/components/MainLayout'
import Link from '@dvcorg/gatsby-theme-iterative/src/components/Link'

export default function Home({ location }: PageProps) {
  return (
    <MainLayout location={location}>
      <div
        className={cn(
          "container','px-4','py-10','flex','flex-col','justify-center','items-center"
        )}
      >
        <h1 className={cn("text-2xl','font-bold','text-center','mb-5")}>
          Gatsby Theme: Iterative
        </h1>
        <section className="text-lg">
          <p>
            Welcome to the documentation and example website for
            Iterative&apos;s website engine!
          </p>
          <p>
            This theme is primarily related to adding a documentation engine,
            which you can see <Link href="/doc">here!</Link>
          </p>
        </section>
      </div>
    </MainLayout>
  )
}
