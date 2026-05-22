import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Share2, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

interface ProjectDetail {
  id: number
  title: string
  category: string
  image: string
  location: string
  year: number
  duration: string
  budget: string
  description: string
  details: string
  features: string[]
  images: string[]
  testimonial: {
    text: string
    author: string
    role: string
  }
}

const projects: Record<number, ProjectDetail> = {
  1: {
    id: 1,
    title: 'Luxury Modern Living Room',
    category: 'Living Room',
    image: '/images/interior-living.jpg',
    location: 'Dombivli',
    year: 2024,
    duration: '3 months',
    budget: 'Premium',
    description: 'A stunning modern living room featuring custom furniture, ambient lighting, and contemporary design elements.',
    details: 'This 2000 sq ft living space showcases our expertise in creating open-plan interiors with sophisticated color palettes and functional design. The space seamlessly blends style with comfort, featuring custom-built furniture pieces, state-of-the-art lighting systems, and premium materials throughout.',
    features: ['Custom Furniture', 'Ambient Lighting', 'Open Plan Design', 'Premium Finishes', '3D Visualization', 'Smart Storage'],
    images: ['/images/interior-living.jpg', '/images/hero-bg.jpg'],
    testimonial: {
      text: 'InDawn Space transformed our living room into a luxurious sanctuary. The attention to detail and quality of work exceeded our expectations.',
      author: 'Rajesh Sharma',
      role: 'Homeowner'
    }
  },
  2: {
    id: 2,
    title: 'Contemporary Kitchen Design',
    category: 'Kitchen',
    image: '/images/interior-kitchen.jpg',
    location: 'Thane',
    year: 2024,
    duration: '2 months',
    budget: 'Mid to Premium',
    description: 'A sleek and functional kitchen with modular cabinets and premium appliances.',
    details: 'This 400 sq ft kitchen space includes smart storage solutions, island counter, and integrated appliances. The design maximizes functionality while maintaining an elegant aesthetic. Every element has been carefully selected to enhance both style and usability.',
    features: ['Modular Cabinets', 'Island Counter', 'Smart Storage', 'Premium Appliances', 'LED Lighting', 'Waterproof Materials'],
    images: ['/images/interior-kitchen.jpg', '/images/interior-dining.jpg'],
    testimonial: {
      text: 'The kitchen design is perfect! It\'s beautiful and so practical for daily use. InDawn Space really understands what homeowners need.',
      author: 'Priya Patel',
      role: 'Homeowner'
    }
  },
  3: {
    id: 3,
    title: 'Master Bedroom Suite',
    category: 'Bedroom',
    image: '/images/interior-bedroom.jpg',
    location: 'Navi Mumbai',
    year: 2024,
    duration: '2.5 months',
    budget: 'Premium',
    description: 'An elegant bedroom with custom wardrobes and luxury finishes.',
    details: 'This 300 sq ft master bedroom offers walk-in wardrobes, ambient lighting, and a spa-like ambiance. The design creates a perfect retreat from the busy world, combining comfort with elegance. Every detail has been thoughtfully designed to promote relaxation and luxury.',
    features: ['Walk-in Wardrobe', 'Luxury Finishes', 'Custom Headboard', 'Ambient Lighting', 'Plush Textures', 'Privacy Design'],
    images: ['/images/interior-bedroom.jpg', '/images/hero-bg.jpg'],
    testimonial: {
      text: 'Our bedroom feels like a luxury hotel room now! The quality and design are exceptional. We\'re extremely happy with the results.',
      author: 'Anuprity Sharma',
      role: 'Homeowner'
    }
  },
  4: {
    id: 4,
    title: 'Formal Dining Space',
    category: 'Dining',
    image: '/images/interior-dining.jpg',
    location: 'Mumbai',
    year: 2024,
    duration: '2 months',
    budget: 'Mid to Premium',
    description: 'An sophisticated dining area perfect for entertaining guests.',
    details: 'This 500 sq ft dining space features a custom dining table, statement lighting, and elegant finishes. The space is designed to accommodate both intimate dinners and grand entertaining. The ambiance is sophisticated yet welcoming.',
    features: ['Custom Dining Table', 'Statement Lighting', 'Elegant Finishes', 'Open Concept', 'Wine Storage', 'Buffet Counter'],
    images: ['/images/interior-dining.jpg', '/images/interior-living.jpg'],
    testimonial: {
      text: 'We love hosting dinner parties now! The dining space is elegant and comfortable. InDawn Space did an amazing job.',
      author: 'Binod Kumar',
      role: 'Homeowner'
    }
  },
  5: {
    id: 5,
    title: 'Home Office Studio',
    category: 'Study',
    image: '/images/interior-study.jpg',
    location: 'Dombivli',
    year: 2024,
    duration: '1.5 months',
    budget: 'Mid',
    description: 'A productive home office with ergonomic furniture and tech integration.',
    details: 'This 250 sq ft workspace combines aesthetics with functionality for the modern professional. The design maximizes natural light, incorporates smart storage, and features ergonomic furniture to promote productivity and well-being throughout the workday.',
    features: ['Ergonomic Furniture', 'Tech Integration', 'Storage Solutions', 'Natural Light', 'Cable Management', 'Acoustic Panels'],
    images: ['/images/interior-study.jpg', '/images/hero-bg.jpg'],
    testimonial: {
      text: 'My home office is now my favorite room! It\'s productive and inspiring. Highly recommend InDawn Space.',
      author: 'Client',
      role: 'Professional'
    }
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const project = projects[parseInt(params.id)]
  return {
    title: `${project?.title} | InDawn Space Gallery`,
    description: project?.description || 'Design project by InDawn Space',
  }
}

export function generateStaticParams() {
  return Object.keys(projects).map((id) => ({
    id,
  }))
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const projectId = parseInt(params.id)
  const project = projects[projectId]

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Project not found</h1>
            <Link href="/gallery">
              <Button variant="outline">Back to Gallery</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const relatedProjects = Object.values(projects)
    .filter(p => p.id !== projectId && p.category === project.category)
    .slice(0, 3)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header with Navigation */}
        <section className="pt-32 pb-8 px-4 md:px-8 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <Link href="/gallery" className="flex items-center gap-2 text-accent mb-6 hover:text-accent/80 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Gallery
            </Link>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-accent font-semibold mb-2">{project.category}</p>
                <h1 className="text-4xl md:text-5xl font-bold font-playfair text-foreground">{project.title}</h1>
              </div>
              <div className="flex gap-2">
                <button className="p-3 rounded-lg hover:bg-accent/10 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-lg hover:bg-accent/10 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Image */}
        <section className="px-4 md:px-8 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="relative w-full h-96 md:h-[600px] rounded-xl overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="px-4 md:px-8 py-16 bg-accent/5">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <p className="text-muted-foreground text-sm mb-2">Location</p>
              <p className="text-xl font-semibold text-foreground">{project.location}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-2">Duration</p>
              <p className="text-xl font-semibold text-foreground">{project.duration}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-2">Year</p>
              <p className="text-xl font-semibold text-foreground">{project.year}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-2">Budget Range</p>
              <p className="text-xl font-semibold text-foreground">{project.budget}</p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto border-t border-border pt-12">
            <h2 className="text-3xl font-bold font-playfair text-foreground mb-6">Project Overview</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">{project.details}</p>

            <h3 className="text-2xl font-bold font-playfair text-foreground mb-6">Key Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              {project.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 p-4 rounded-lg bg-background border border-border">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="px-4 md:px-8 py-16">
          <div className="max-w-3xl mx-auto text-center bg-accent/10 rounded-xl p-12">
            <p className="text-2xl font-playfair text-foreground mb-6 italic">"{project.testimonial.text}"</p>
            <p className="text-lg font-semibold text-foreground mb-2">{project.testimonial.author}</p>
            <p className="text-muted-foreground">{project.testimonial.role}</p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 md:px-8 py-16 bg-accent/5">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-6">Inspired by This Design?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let our design experts create a similar personalized design for your space.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              Schedule Free Consultation
            </Button>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="px-4 md:px-8 py-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold font-playfair text-foreground mb-12">Similar Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProjects.map((p) => (
                  <Link key={p.id} href={`/gallery/${p.id}`}>
                    <div className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-lg mb-4 h-64">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">{p.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2">{p.location}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
