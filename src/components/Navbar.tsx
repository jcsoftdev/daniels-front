'use client'
import { routes } from '@/src/routes'
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from '@nextui-org/react'
import { usePathname } from 'next/navigation'

export default function App() {
  const pathName = usePathname()

  return (
    <Navbar isBordered>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <p className="font-bold text-inherit">Daniel&rsquo;s Home</p>
        </NavbarBrand>
        {routes.map((route, index) => (
          <NavbarItem key={`${route.path}`}>
            <Link
              className={`text-md ${
                pathName === route.path ? 'text-primary' : 'text-foreground'
              } `}
              href={route.path}
              size="lg"
            >
              {route.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="solid" size="sm">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent> */}

      <NavbarMenu>
        <div className="w-full flex flex-col items-center py-5">
          {routes.map((item, index) => (
            <NavbarMenuItem key={`${item.path}`}>
              <Link
                className={`text-md w-full ${
                  pathName === item.path ? 'text-primary' : 'text-foreground'
                } `}
                href={item.path}
              >
                {item.title}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </Navbar>
  )
}
