import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Truck, Shield, Award, Headphones } from 'lucide-react'
import { products, reviews, getWhatsAppLink, WHATSAPP_NUMBER } from '@/lib/data'
import { ProductCard } from '@/components/product-card'
import { ReviewCard } from '@/components/review-card'

export default function HomePage() {
  const featuredProducts = products.slice(0, 6)
  const featuredReviews = reviews.slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-sandal.png"
            alt="MuchiBari Premium Leather Sandals"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-xl">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              আত্মবিশ্বাসী
              <span className="block text-secondary">পদক্ষেপে</span>
            </h1>
            <p className="mt-4 text-lg text-white/90">
              Step into confidence with premium handcrafted leather goods
            </p>
            <p className="mt-2 text-white/70">
              প্রিমিয়াম লেদার প্রোডাক্টের জন্য আপনার বিশ্বস্ত ঠিকানা
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={getWhatsAppLink('Hi, I want to place an order')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Order
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-card py-8 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 justify-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">সারাদেশে ডেলিভারি</h4>
                <p className="text-xs text-muted-foreground">Nationwide Delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">১০০% আসল লেদার</h4>
                <p className="text-xs text-muted-foreground">100% Genuine Leather</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">মানের নিশ্চয়তা</h4>
                <p className="text-xs text-muted-foreground">Quality Guaranteed</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Headphones className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">২৪/৭ সাপোর্ট</h4>
                <p className="text-xs text-muted-foreground">24/7 Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground">
              Featured Products
            </h2>
            <p className="mt-2 text-muted-foreground">
              আমাদের সেরা সংগ্রহ থেকে বেছে নিন
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square lg:aspect-auto lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&h=800&fit=crop"
                alt="Leather craftsmanship"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground">
                Our Story
              </h2>
              <p className="mt-2 text-secondary font-medium">আমাদের গল্প</p>
              <div className="mt-6 space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  MuchiBari started with a simple vision — to bring authentic, handcrafted leather goods 
                  to every doorstep in Bangladesh. Our artisans carry forward generations of leather 
                  crafting expertise, blending traditional techniques with modern design.
                </p>
                <p>
                  মুচিবাড়ি শুরু হয়েছিল একটি সহজ স্বপ্ন নিয়ে — বাংলাদেশের প্রতিটি ঘরে আসল, হাতে তৈরি 
                  লেদার পণ্য পৌঁছে দেওয়া। আমাদের কারিগররা প্রজন্মের পর প্রজন্ম ধরে চলে আসা লেদার 
                  শিল্পের উত্তরাধিকার বহন করছেন।
                </p>
                <p>
                  Each product is a testament to quality, comfort, and timeless style. We believe in 
                  sustainable practices and fair wages for our skilled craftsmen.
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 mt-8 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Learn More About Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground">
              Customer Reviews
            </h2>
            <p className="mt-2 text-muted-foreground">
              আমাদের সম্মানিত ক্রেতাদের মতামত
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              View All Reviews
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA Banner */}
      <section className="bg-primary py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h2 className="font-serif text-2xl lg:text-3xl font-bold text-primary-foreground">
                Ready to Order?
              </h2>
              <p className="mt-2 text-primary-foreground/80">
                WhatsApp-এ অর্ডার করুন, সহজে এবং দ্রুত!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href={getWhatsAppLink('Hi, I want to place an order')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#25D366]/90 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Order on WhatsApp
              </a>
              <a
                href={`tel:${WHATSAPP_NUMBER}`}
                className="inline-flex items-center gap-2 text-primary-foreground font-semibold"
              >
                <span className="text-2xl">{WHATSAPP_NUMBER}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
