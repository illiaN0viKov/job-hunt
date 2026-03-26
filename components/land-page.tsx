'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Props = {}

const HERO_IMAGES = [
  { src: '/hero-images/hero1.png', alt: 'Professional workspace' },
  { src: '/hero-images/hero2.png', alt: 'Job hunting tools' },
  { src: '/hero-images/hero3.png', alt: 'Career growth' },
]

const LandPage = (props: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)
  }

  const currentImage = HERO_IMAGES[currentImageIndex]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-6 py-16 lg:py-24 max-w-7xl mx-auto">
        {/* Content */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Track Your Job
            </h2>
            <p className="text-lg text-gray-600">
              Stay organized. Monitor every application, response, and opportunity in one elegant dashboard.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-gray-700">
              Never lose track of where you applied, what you heard back, or your next steps.
            </p>
          </div>

          <div className="flex gap-4 pt-4">

            <Link href="/sign-up">
              <Button size="lg" className="text-base">
                Get Started
              </Button>
            </Link>
            
            <Button size="lg" variant="outline" className="text-base">
              Learn More
            </Button>
          </div>
        </div>

        {/* Image Carousel */}
        <div className="space-y-4">
          <div className="relative w-full h-[400px] rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Image Navigation */}
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={prevImage}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex gap-2">
              {HERO_IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-gray-900 w-8' : 'bg-gray-300 w-2'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextImage}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-gray-900">📋</div>
            <h3 className="font-semibold text-gray-900">Track Applications</h3>
            <p className="text-sm text-gray-600">Manage all your job applications in one place</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-gray-900">💬</div>
            <h3 className="font-semibold text-gray-900">Monitor Responses</h3>
            <p className="text-sm text-gray-600">Never miss a follow-up or opportunity</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-gray-900">✨</div>
            <h3 className="font-semibold text-gray-900">Stay Organized</h3>
            <p className="text-sm text-gray-600">Keep your job hunt structured and efficient</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h3 className="text-3xl font-bold text-gray-900">Ready to organize your job hunt?</h3>
          <p className="text-gray-600 text-lg">Start tracking your applications today</p>
          <Link href="/dashboard">
            <Button size="lg" className="text-base mt-4">
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandPage