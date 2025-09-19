import { Facebook, Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-16 md:mt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Minimalist Blogger. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-primary transition-colors"><Twitter size={20} /></Link>
            <Link href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></Link>
            <Link href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
