import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  return <div className="max-w-4xl px-6 mx-auto">{children}</div>
}

export default Layout
