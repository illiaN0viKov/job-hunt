'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { signIn } from '@/lib/auth/auth-client'
import { useRouter } from 'next/navigation'
type Props = {}

const SignIn = (props: Props) => {

 const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({})
  const [loading, setLoading] = useState(false)


  const router = useRouter()

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()
  setErrors({})

  // Client-side validation
  if (!email.trim()) {
    setErrors({ email: 'Email is required' })
    return
  }

  if (!password) {
    setErrors({ password: 'Password is required' })
    return
  }
  

  setLoading(true)
  try {
    const result = await signIn.email({
      email,
      password,
    })

    if (result.error) {
      const message = result.error.message ?? ''
      if (message.toLowerCase().includes('email')) {
        setErrors({ email: message })
      } else if (message.toLowerCase().includes('password')) {
        setErrors({ password: message })
      } else {
        setErrors({ general: message || 'Failed to sign in' })
      }
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  } catch (err) {
    setErrors({ general: 'Unexpected error occurred. Please try again.' })
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
          <p className="text-gray-600">Enter your credentials to access your account</p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* General Error Message */}
          {errors.general && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{errors.general}</p>
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              disabled={loading}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors({ ...errors, email: undefined })
              }}
              placeholder="you@example.com"
              className={cn(
                "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition disabled:bg-gray-50 disabled:cursor-not-allowed",
                errors.email 
                  ? "border-red-300 focus:ring-red-500" 
                  : "border-gray-300 focus:ring-blue-500"
              )}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              disabled={loading}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password) setErrors({ ...errors, password: undefined })
              }}
              placeholder="••••••••"
              className={cn(
                "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition disabled:bg-gray-50 disabled:cursor-not-allowed",
                errors.password 
                  ? "border-red-300 focus:ring-red-500" 
                  : "border-gray-300 focus:ring-blue-500"
              )}
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Sign In Button */}
          <Button className="w-full h-10" disabled={loading} type='submit'>
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn