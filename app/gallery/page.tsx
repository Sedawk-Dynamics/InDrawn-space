import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Share2, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Design Gallery | InDawn Space',
  description: 'Browse our collection of premium interior design projects across Mumbai, Thane, and Navi Mumbai.',
}

const designProjects = [
  {
    id: 1,
    title: 'Luxury Modern Living Room',
    category: 'Living Room',
    image: '/images/interior-living.jpg',
    location: 'Dombivli',
    description: 'A stunning modern living room featuring custom furniture, ambient lighting, and contemporary design elements.',
    details: 'This 2000 sq ft living space showcases our expertise in creating open-plan interiors with sophisticated color palettes and functional design.',
    features: ['Custom Furniture', 'Ambient Lighting', 'Open Plan Design', 'Premium Finishes']
  },
  {
    id: 2,
    title: 'Contemporary Kitchen Design',
    category: 'Kitchen',
    image: '/images/interior-kitchen.jpg',
    location: 'Thane',
    description: 'A sleek and functional kitchen with modular cabinets and premium appliances.',
    details: 'This 400 sq ft kitchen space includes smart storage solutions, island counter, and integrated appliances for modern living.',
    features: ['Modular Cabinets', 'Island Counter', 'Smart Storage', 'Premium Appliances']
  },
  {
    id: 3,
    title: 'Master Bedroom Suite',
    category: 'Bedroom',
    image: '/images/interior-bedroom.jpg',
    location: 'Navi Mumbai',
    description: 'An elegant bedroom with custom wardrobes and luxury finishes.',
    details: 'This 300 sq ft master bedroom offers walk-in wardrobes, ambient lighting, and a spa-like ambiance.',
    features: ['Walk-in Wardrobe', 'Luxury Finishes', 'Custom Headboard', 'Ambient Lighting']
  },
  {
    id: 4,
    title: 'Formal Dining Space',
    category: 'Dining',
    image: '/images/interior-dining.jpg',
    location: 'Mumbai',
    description: 'An sophisticated dining area perfect for entertaining guests.',
    details: 'This 500 sq ft dining space features a custom dining table, statement lighting, and elegant finishes.',
    features: ['Custom Dining Table', 'Statement Lighting', 'Elegant Finishes', 'Open Concept']
  },
  {
    id: 5,
    title: 'Home Office Studio',
    category: 'Study',
    image: '/images/interior-study.jpg',
    location: 'Dombivli',
    description: 'A productive home office with ergonomic furniture and tech integration.',
    details: 'This 250 sq ft workspace combines aesthetics with functionality for the modern professional.',
    features: ['Ergonomic Furniture', 'Tech Integration', 'Storage Solutions', 'Natural Light']
  },
]

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Gallery Header */}
        <section className="pt-32 pb-16 px-4 md:px-8 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <Link href="/" className="flex items-center gap-2 text-accent mb-6 hover:text-accent/80 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold font-playfair text-foreground mb-4">Browse Our Popular Designs</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explore our collection of premium interior design projects delivered across Dombivli, Thane, Mumbai, and Navi Mumbai. Each project showcases our commitment to excellence and innovative design solutions.
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {designProjects.map((project) => (
                <Link key={project.id} href={`/gallery/${project.id}`}>
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-lg mb-4 h-80">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Button variant="secondary" className="text-accent">
                          View Details
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-accent font-semibold">{project.category}</span>
                        <span className="text-xs text-muted-foreground">{project.location}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-8 bg-accent/5">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-6">Ready to Transform Your Space?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let our design experts create a personalized interior design plan for your home. Book a consultation today.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              Schedule Consultation
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
