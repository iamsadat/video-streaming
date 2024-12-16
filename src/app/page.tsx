"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Play, Tv, Users, Zap, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

const AnimatedBackground = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dots = [];
  const size = 20;
  const gap = 40;

  for (let x = 0; x < dimensions.width; x += gap) {
    for (let y = 0; y < dimensions.height; y += gap) {
      dots.push({ x, y });
    }
  }

  return (
    <svg
      className="fixed inset-0 z-0"
      width={dimensions.width}
      height={dimensions.height}
    >
      {dots.map((dot, index) => (
        <motion.circle
          key={index}
          cx={dot.x}
          cy={dot.y}
          r={1.5}
          fill="#ffffff"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 2,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </svg>
  );
};

const ScrollAnimatedSection = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission here
    console.log("Submitted email:", email);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        {/* Hero Section */}
        <ScrollAnimatedSection>
          <section
            id="welcome"
            className="container mx-auto px-4 py-20 text-center"
          >
            <h1 className="text-6xl font-bold mb-6">
              Welcome to <span className="text-blue-500">StreamCraft</span>
            </h1>
            <p className="text-2xl mb-8">
              Your ultimate destination for video streaming and live broadcasts
            </p>
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-4 py-2 rounded-md bg-gray-800 text-white"
                  required
                />
                <Link href="/signup">
                  <Button>Get Started</Button>
                </Link>
              </form>
              <SignOutButton />
            </div>
          </section>
        </ScrollAnimatedSection>

        {/* Features Section */}
        <ScrollAnimatedSection>
          <section
            id="why-streamcraft"
            className="bg-gray-800 bg-opacity-80 py-20"
          >
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center">
                Why Choose StreamCraft?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Video size={40} />,
                    title: "On-demand Video Streaming",
                    description:
                      "Access a vast library of movies and TV shows anytime",
                  },
                  {
                    icon: <Video size={40} />,
                    title: "Live Streaming",
                    description: "Watch and host live events, sports, and more",
                  },
                  {
                    icon: <Zap size={40} />,
                    title: "Lightning-fast Playback",
                    description:
                      "Enjoy buffer-free streaming with our optimized platform",
                  },
                  {
                    icon: <Tv size={40} />,
                    title: "Multi-device Support",
                    description:
                      "Stream on your TV, phone, tablet, or computer",
                  },
                  {
                    icon: <Users size={40} />,
                    title: "Multiple Profiles",
                    description:
                      "Create profiles for everyone in your household",
                  },
                  {
                    icon: <Play size={40} />,
                    title: "Offline Viewing",
                    description:
                      "Download content to watch without an internet connection",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-700 bg-opacity-50 backdrop-blur-sm p-6 rounded-lg text-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="mb-4 inline-block text-blue-400">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p>{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </ScrollAnimatedSection>

        {/* Video Streaming Section */}
        <ScrollAnimatedSection>
          <section className="container mx-auto px-4 py-20">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-4xl font-bold mb-4">
                  Unlimited Video Streaming
                </h2>
                <p className="text-xl mb-6">
                  Dive into a world of entertainment with our vast library of
                  movies, TV shows, documentaries, and more. Stream in high
                  quality, anytime, anywhere.
                </p>
                <Button size="lg">
                  <Play className="mr-2 h-4 w-4" /> Start Watching Now
                </Button>
              </div>
              <div className="md:w-1/2">
                <div className="relative w-full h-0 pb-[56.25%]">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimatedSection>

        {/* Live Streaming Section */}
        <ScrollAnimatedSection>
          <section className="bg-gray-800 bg-opacity-80 py-20">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row-reverse items-center">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pl-8">
                  <h2 className="text-4xl font-bold mb-4">
                    Go Live with StreamCraft
                  </h2>
                  <p className="text-xl mb-6">
                    Broadcast your content to the world or enjoy live streams
                    from your favorite creators. Experience real-time
                    interaction like never before.
                  </p>
                  <Button size="lg" variant="outline">
                    <Video className="mr-2 h-4 w-4" /> Start Streaming
                  </Button>
                </div>
                <div className="md:w-1/2">
                  <img
                    src="/placeholder.svg?height=300&width=400"
                    alt="Live Streaming Illustration"
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimatedSection>

        {/* CTA Section */}
        <ScrollAnimatedSection>
          <section className="container mx-auto px-4 py-20 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Craft Your Streaming Experience?
            </h2>
            <p className="text-xl mb-8">
              Join millions of viewers and creators on StreamCraft today.
            </p>
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              <Play className="mr-2 h-4 w-4" /> Get Started with StreamCraft
            </Button>
          </section>
        </ScrollAnimatedSection>

        {/* Footer */}
        <footer className="bg-gray-800 bg-opacity-80 py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2023 StreamCraft. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
