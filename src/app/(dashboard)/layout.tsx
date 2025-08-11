'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Define auth routes
  const authRoutes = ['/login', '/register']
  const isAuthRoute = authRoutes.includes(pathname)

  useEffect(() => {
    checkAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setIsAuthenticated(true)
        // If user just signed in and is on auth route, redirect to home
        if (isAuthRoute) {
          router.push('/')
        }
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false)
        // If user signed out and not on auth route, redirect to login
        if (!isAuthRoute) {
          router.push('/login')
        }
      }
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [pathname, isAuthRoute, router])

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const isAuth = !!session

      setIsAuthenticated(isAuth)

      // Handle redirects based on auth status
      if (isAuth && isAuthRoute) {
        // Authenticated user trying to access login/register
        router.replace('/')
        return
      }

      if (!isAuth && !isAuthRoute) {
        // Unauthenticated user trying to access protected route
        router.replace('/login')
        return
      }
    } catch (error) {
      console.error('Auth check error:', error)
      setIsAuthenticated(false)
      if (!isAuthRoute) {
        router.replace('/login')
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // Show children if auth check passes
  return <>{children}</>
}