import { PlaceHolderImages } from './placeholder-images';

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  imageHint: string;
  date: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  category: string;
  tags: string[];
  featured: boolean;
}

const getImage = (id: string) => {
  const img = PlaceHolderImages.find(p => p.id === id);
  return {
    imageUrl: img?.imageUrl || `https://picsum.photos/seed/${id}/1200/800`,
    imageHint: img?.imageHint || 'placeholder',
  };
};

const posts: Post[] = [
  {
    id: '1',
    slug: 'the-art-of-state-management-in-react',
    title: 'The Art of State Management in React',
    excerpt: 'Exploring various state management libraries and patterns in React, from Context API to Redux and Zustand.',
    content: `
# The Art of State Management in React

State management is a critical aspect of any large-scale React application. As your app grows, passing props down through multiple layers of components (prop drilling) becomes cumbersome and hard to maintain. This is where state management libraries come in.

## React Context API

For simple to moderately complex apps, React's built-in Context API can be a great solution. It allows you to share state across the entire app without having to pass props down manually at every level.

## Redux

Redux is the most well-known state management library for React. It provides a predictable state container, which helps in writing applications that behave consistently. However, it is often criticized for its boilerplate.

## Zustand

Zustand is a small, fast, and scalable bearbones state-management solution using simplified flux principles. It has a comfy API based on hooks and isn't boilerplatey or opinionated.
    `,
    ...getImage('post-1'),
    date: '2024-07-15T10:00:00Z',
    author: { name: 'Jane Doe', avatarUrl: 'https://i.pravatar.cc/150?u=jane' },
    category: 'Technology',
    tags: ['React', 'State Management', 'JavaScript'],
    featured: true,
  },
  {
    id: '2',
    slug: 'design-thinking-for-developers',
    title: 'Design Thinking for Developers',
    excerpt: 'How incorporating design thinking principles can lead to better, more user-centric products.',
    content: `
# Design Thinking for Developers

Design thinking is not just for designers. As developers, we are often focused on the technical implementation of features. However, by understanding and applying design thinking principles, we can build products that are not only functional but also delightful to use.

## Empathize

The first step is to empathize with your users. Understand their needs, pain points, and motivations. This can be done through user interviews, surveys, and observation.

## Define

Based on your user research, define the core problem you are trying to solve. A clear problem statement will guide your development process.

## Ideate, Prototype, Test

Brainstorm potential solutions, build low-fidelity prototypes, and test them with users. This iterative process allows you to fail fast and learn quickly, ultimately leading to a better product.
    `,
    ...getImage('post-2'),
    date: '2024-07-10T14:30:00Z',
    author: { name: 'John Smith', avatarUrl: 'https://i.pravatar.cc/150?u=john' },
    category: 'Design',
    tags: ['UX', 'Productivity', 'Development'],
    featured: true,
  },
  {
    id: '3',
    slug: 'a-guide-to-mindful-coding',
    title: 'A Guide to Mindful Coding',
    excerpt: 'Techniques to stay focused, reduce stress, and write better code through mindfulness.',
    content: `
# A Guide to Mindful Coding

In our fast-paced world, it's easy to get distracted and feel overwhelmed. Mindful coding is about bringing your full attention to the present moment, which can lead to increased focus, reduced stress, and higher-quality code.

## The Pomodoro Technique

Work in focused 25-minute intervals, followed by a short break. This can help maintain high levels of concentration.

## Single-Tasking

Avoid multitasking. Focus on one task at a time. Close unnecessary tabs and turn off notifications to minimize distractions.

## Take Regular Breaks

Step away from your computer to stretch, walk, or do something non-screen related. This helps to refresh your mind and prevent burnout.
    `,
    ...getImage('post-3'),
    date: '2024-07-05T09:00:00Z',
    author: { name: 'Emily White', avatarUrl: 'https://i.pravatar.cc/150?u=emily' },
    category: 'Personal Growth',
    tags: ['Mindfulness', 'Productivity', 'Wellness'],
    featured: true,
  },
  {
    id: '4',
    slug: 'mastering-nextjs-14-features',
    title: 'Mastering Next.js 14 Features',
    excerpt: 'A deep dive into the latest features of Next.js 14, including Server Actions and improved performance.',
    content: '# Mastering Next.js 14 Features\n\nNext.js 14 brought a host of new features that aim to improve both developer experience and application performance. Let\'s explore some of the key updates.\n\n## Server Actions\n\nServer Actions are a game-changer. They allow you to define and call server-side functions directly from your React components, simplifying data mutations and form submissions without needing to create separate API routes.',
    ...getImage('post-4'),
    date: '2024-06-28T11:00:00Z',
    author: { name: 'Jane Doe', avatarUrl: 'https://i.pravatar.cc/150?u=jane' },
    category: 'Technology',
    tags: ['Next.js', 'Web Development'],
    featured: false,
  },
  {
    id: '5',
    slug: 'the-secret-to-effective-team-productivity',
    title: 'The Secret to Effective Team Productivity',
    excerpt: 'It\'s not about working harder, it\'s about working smarter. Discover the keys to unlocking your team\'s potential.',
    content: '# The Secret to Effective Team Productivity\n\nWhat makes some teams incredibly productive while others struggle? The secret often lies in a few key principles: clear communication, defined goals, and the right tools. By fostering an environment of trust and providing your team with the autonomy to succeed, you can unlock unprecedented levels of productivity.',
    ...getImage('post-5'),
    date: '2024-06-22T16:00:00Z',
    author: { name: 'John Smith', avatarUrl: 'https://i.pravatar.cc/150?u=john' },
    category: 'Productivity',
    tags: ['Teamwork', 'Management'],
    featured: false,
  },
  {
    id: '6',
    slug: 'lifelong-learning-for-the-modern-developer',
    title: 'Lifelong Learning for the Modern Developer',
    excerpt: 'The tech landscape is always changing. Here\'s how to stay current and continuously grow your skills.',
    content: '# Lifelong Learning for the Modern Developer\n\nIn the world of software development, standing still means falling behind. Embracing lifelong learning is not just a good habit; it\'s essential for a long and successful career. This article explores strategies for continuous learning, from following industry blogs and podcasts to contributing to open-source projects.',
    ...getImage('post-6'),
    date: '2024-06-15T08:00:00Z',
    author: { name: 'Emily White', avatarUrl: 'https://i.pravatar.cc/150?u=emily' },
    category: 'Personal Growth',
    tags: ['Career', 'Development'],
    featured: false,
  },
  {
    id: '7',
    slug: 'building-accessible-interfaces',
    title: 'Building Accessible Interfaces: A Guide',
    excerpt: 'Accessibility is not an afterthought. Learn the fundamentals of building web interfaces that work for everyone.',
    content: '# Building Accessible Interfaces: A Guide\n\nWeb accessibility (a11y) ensures that people with disabilities can use and interact with the web. This guide covers the fundamental principles, including semantic HTML, ARIA attributes, and keyboard navigation, to help you build more inclusive products.',
    ...getImage('post-7'),
    date: '2024-06-10T13:20:00Z',
    author: { name: 'Jane Doe', avatarUrl: 'https://i.pravatar.cc/150?u=jane' },
    category: 'Design',
    tags: ['Accessibility', 'UX', 'Web Development'],
    featured: false,
  },
  {
    id: '8',
    slug: 'my-journey-into-freelancing',
    title: 'My Journey into Freelancing',
    excerpt: 'The highs, lows, and unexpected lessons from my first year as a freelance developer.',
    content: '# My Journey into Freelancing\n\nLeaving a stable job to become a freelance developer was one of the scariest and most rewarding decisions of my life. In this post, I share the practical steps I took, the challenges I faced (like finding clients and managing finances), and the freedom I\'ve gained.',
    ...getImage('post-8'),
    date: '2024-06-01T18:00:00Z',
    author: { name: 'John Smith', avatarUrl: 'https://i.pravatar.cc/150?u=john' },
    category: 'Personal Growth',
    tags: ['Freelancing', 'Career'],
    featured: false,
  },
  {
    id: '9',
    slug: 'the-power-of-atomic-design',
    title: 'The Power of Atomic Design Systems',
    excerpt: 'How breaking down UIs into their smallest components can lead to more consistent and scalable design systems.',
    content: '# The Power of Atomic Design Systems\n\nAtomic Design, a methodology created by Brad Frost, provides a structured way to build design systems. By thinking of interfaces as a collection of atoms, molecules, organisms, templates, and pages, teams can create UIs that are more consistent, scalable, and easier to maintain.',
    ...getImage('post-9'),
    date: '2024-05-25T10:00:00Z',
    author: { name: 'Jane Doe', avatarUrl: 'https://i.pravatar.cc/150?u=jane' },
    category: 'Design',
    tags: ['Design Systems', 'UI'],
    featured: false,
  },
  {
    id: '10',
    slug: 'minimalism-in-web-design',
    title: 'Why Minimalism is More Than Just an Aesthetic',
    excerpt: 'Exploring how minimalist principles can improve usability, performance, and user focus in web design.',
    content: '# Why Minimalism is More Than Just an Aesthetic\n\nMinimalism in web design is not just about using a lot of white space. It\'s a philosophy focused on removing the superfluous to make the essential stand out. A minimalist approach can lead to faster load times, improved usability, and a more focused user experience. It forces designers to prioritize content and functionality, resulting in a more purposeful and effective design.',
    ...getImage('post-10'),
    date: '2024-05-18T12:00:00Z',
    author: { name: 'Emily White', avatarUrl: 'https://i.pravatar.cc/150?u=emily' },
    category: 'Design',
    tags: ['Minimalism', 'UI', 'UX'],
    featured: false,
  },
];

export const getPosts = (): Post[] => {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getFeaturedPosts = (): Post[] => {
  return posts.filter(p => p.featured).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getPostBySlug = (slug: string): Post | undefined => {
  return posts.find(p => p.slug === slug);
};

export const getCategories = (): string[] => {
    const categories = new Set(posts.map(p => p.category));
    return Array.from(categories);
}

export const getTags = (): string[] => {
    const tags = new Set(posts.flatMap(p => p.tags));
    return Array.from(tags);
}
