"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GithubIcon, LinkedinIcon, MailIcon, MenuIcon, Sun, Moon } from 'lucide-react';
import Image from 'next/image';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { useTheme } from 'next-themes';

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openCVInNewTab = () => {
    const cvUrl = "/cv/CV.pdf";
    window.open(cvUrl, '_blank');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200">
  <motion.header 
    className="sticky top-0 z-10 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 border-b border-amber-200 dark:border-gray-700"
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="container mx-auto px-4 py-4 relative flex items-center justify-center h-20">
      
      {/* Sección Izquierda: Imagen y Nombre */}
      <div className="absolute left-4 flex items-center space-x-4">
        <div className="relative w-16 h-16">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202023-12-08%20at%2015.56.55-j6JJ7eevkArLurHLqXAtOxIL2SS681.jpeg"
            alt="Fernando Alfayé"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <h1 className="text-2xl font-bold text-amber-800 dark:text-amber-400">Fernando Alfayé</h1>
      </div>

      {/* Navegación Central - Oculta en pantallas pequeñas */}
      <nav className="hidden md:flex space-x-4">
        {['About', 'Projects', 'Contact'].map((item) => (
          <a 
            key={item} 
            onClick={() => scrollToSection(item.toLowerCase())}
            className="relative px-2 py-1 text-amber-700 dark:text-amber-300 hover:text-amber-500 dark:hover:text-amber-100 transition-colors duration-200 group cursor-pointer"
          >
            {item}
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-amber-500 dark:bg-amber-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
          </a>
        ))}
      </nav>

      {/* Botón de Tema y Menú */}
      <div className="absolute right-4 flex items-center space-x-2">
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-amber-700 dark:text-amber-300"
          >
            {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </Button>
        )}
        {/* Botón de menú hamburguesa visible solo en pantallas pequeñas */}
        <Button variant="ghost" size="icon" className="md:hidden text-amber-700 dark:text-amber-300" onClick={toggleMenu}>
          <MenuIcon className="h-6 w-6" />
        </Button>
      </div>
    </div>

    {/* Menú Móvil - Solo visible en pantallas pequeñas */}
    {isMenuOpen && (
      <motion.nav 
        className="md:hidden bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 border-t border-amber-200 dark:border-gray-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
          {['About', 'Projects', 'Contact'].map((item) => (
            <a 
              key={item}
              onClick={() => {
                scrollToSection(item.toLowerCase());
                toggleMenu(); // Cerrar el menú al hacer clic en una opción
              }}
              className="relative px-2 py-1 text-amber-700 dark:text-amber-300 hover:text-amber-500 dark:hover:text-amber-100 transition-colors duration-200 group cursor-pointer"
            >
              {item}
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-amber-500 dark:bg-amber-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </a>
          ))}
        </div>
      </motion.nav>
    )}
  </motion.header>

  {/* Resto del contenido */}
  <HeroSection openCVInNewTab={openCVInNewTab} />
  <ProjectsSection />
  <ContactSection />

  <footer className="py-4 bg-amber-800 dark:bg-gray-900 text-white">
    <div className="container mx-auto px-4 text-center">
      <p>&copy; 2023 Fernando Alfayé. All rights reserved.</p>
    </div>
  </footer>
</div>

  );
}

// ... (El resto de los componentes se mantienen igual, solo necesitan ajustes en los colores para el tema oscuro)

function HeroSection({ openCVInNewTab }: { openCVInNewTab: () => void }) {
  const [ref, inView] = useInView({
    threshold: 0.6,
    triggerOnce: false,
  });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id="about"
      className="py-20 bg-gradient-to-r from-amber-100 to-orange-200 dark:from-gray-800 dark:to-gray-700 scroll-mt-20"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.5, staggerChildren: 0.2 }}
    >
      <div className="container mx-auto px-4 text-center">
        <motion.h2 variants={variants} className="text-4xl font-bold mb-4 text-amber-800 dark:text-amber-400">
          Hi, I&apos;m Fernando Alfayé
        </motion.h2>
        <motion.p variants={variants} className="text-xl mb-8 text-amber-700 dark:text-amber-300">
          A passionate front-end developer creating amazing web experiences
        </motion.p>
        <motion.div variants={variants}>
          <Button size="lg" onClick={openCVInNewTab} className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600 text-white">Download CV</Button>
        </motion.div>
      </div>
    </motion.section>
  );
}

function ProjectsSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.section
      id="projects"
      className="py-20 bg-white dark:bg-gray-900"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-amber-800 dark:text-amber-400">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((project) => (
            <motion.div key={project} variants={itemVariants} transition={{ duration: 0.5 }}>
              <Card className="border-amber-200 dark:border-gray-700 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-amber-700 dark:text-amber-300">Project {project}</CardTitle>
                  <CardDescription className="dark:text-gray-400">A brief description of Project {project}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image 
                    src={`/placeholder.svg?height=200&width=400`} 
                    alt={`Project ${project}`}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </CardContent>
                <CardFooter>
                  <Button className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600 text-white">View Project</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function ContactSection() {
  const [ref, inView] = useInView({
    threshold: 0.6,
    triggerOnce: false,
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setStatus('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus('Email sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const errorData = await response.json();
        setStatus(`Failed to send email: ${errorData.error}`);
      }
    } catch (error) {
      setStatus('An error occurred. Please try again.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.section
      id="contact"
      className="py-20 bg-gradient-to-r from-amber-100 to-orange-200 dark:from-gray-800 dark:to-gray-700"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-amber-800 dark:text-amber-400">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-amber-200 dark:border-gray-700 flex flex-col items-center justify-center text-center"
          >
            <h3 className="text-xl font-semibold mb-4 text-amber-700 dark:text-amber-300">Contact Information</h3>
            <div className="space-y-2 text-amber-800 dark:text-amber-200">
              <p className="flex items-center justify-center"><MailIcon className="mr-2 text-amber-600 dark:text-amber-400" /> alfayefernando@gmail.com</p>
              <p className="flex items-center justify-center"><LinkedinIcon className="mr-2 text-amber-600 dark:text-amber-400" /> linkedin.com/in/fernandoalfaye</p>
              <p className="flex items-center justify-center"><GithubIcon className="mr-2 text-amber-600 dark:text-amber-400" /> github.com/Ferfix21</p>
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-amber-200 dark:border-gray-700"
          >
            <h3 className="text-xl font-semibold mb-4 text-amber-700 dark:text-amber-300">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Your Name"
                className="border-amber-300 focus:border-amber-500 dark:border-gray-600 dark:focus:border-amber-400 dark:bg-gray-700 dark:text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Your Email"
                className="border-amber-300 focus:border-amber-500 dark:border-gray-600 dark:focus:border-amber-400 dark:bg-gray-700 dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Textarea
                placeholder="Your Message"
                className="border-amber-300 focus:border-amber-500 dark:border-gray-600 dark:focus:border-amber-400 dark:bg-gray-700 dark:text-white"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button type="submit" className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600 text-white">Send Message</Button>
              {status && <p className="mt-4 text-amber-800 dark:text-amber-200">{status}</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}