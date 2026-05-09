'use client'

import { LogOut, Settings as SettingsIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Avatar,
  AvatarFallback,
} from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Section } from '@/components/ui/section'
import { Wordmark } from '@/components/ui/wordmark'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/leads', label: 'Leads' },
  { href: '/appointments', label: 'Appointments' },
  { href: '/settings', label: 'Settings' },
]

interface TopNavProps {
  user: {
    fullName: string | null
    email: string
  }
}

function initials(name: string | null, email: string) {
  if (name && name.trim()) {
    return name
      .trim()
      .split(/\s+/)
      .map((p) => p[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }
  return email.slice(0, 2).toUpperCase()
}

export function TopNav({ user }: TopNavProps) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <Section variant="wide" as="nav" className="flex h-14 items-center justify-between">
        <Wordmark size="sm" href="/leads" />

        <ul className="hidden items-center gap-1 sm:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'relative px-3 py-1.5 text-sm transition-colors',
                    active
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {item.label}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute inset-x-3 -bottom-3.75 h-px bg-primary"
                    />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <Avatar className="size-8 border border-border">
                <AvatarFallback className="bg-surface-elevated text-xs font-medium text-foreground">
                  {initials(user.fullName, user.email)}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 border-border bg-surface-elevated">
            <DropdownMenuLabel className="flex flex-col gap-0.5 font-normal">
              <span className="truncate text-sm font-medium text-foreground">
                {user.fullName ?? 'Account'}
              </span>
              <span className="truncate font-mono text-xs text-muted-foreground">
                {user.email}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center">
                <SettingsIcon className="mr-2 size-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="p-0">
              <form action="/logout" method="POST" className="w-full">
                <button
                  type="submit"
                  className="flex w-full items-center px-2 py-1.5 text-sm text-foreground hover:bg-white/5"
                >
                  <LogOut className="mr-2 size-4" />
                  Log out
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Section>
    </header>
  )
}
