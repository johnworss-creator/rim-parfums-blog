import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { client } from '../../lib/sanity';
import { Navbar } from '../../components/Navbar';
import { ArrowRight } from 'lucide-react';

// Récupération des articles depuis Sanity
export async function getStaticProps() {
  const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    slug,
    publishedAt,
    // On génère un résumé automatique à partir du contenu
    "excerpt": array::join(string::split((pt::text(body)), "")[0..150], "") + "..."
  }`);

  return {
    props: { posts },
    revalidate: 10,
  };
}

export default function BlogList({ posts }: any) {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <Head>
        <title>Blog | RIM Parfums</title>
      </Head>
      
      {/* On réutilise ta Navbar existante */}
      <Navbar />

      <main className="pt-32 pb-20 max-w-3xl mx-auto px-6">
        {/* Header Minimaliste */}
        <div className="mb-16 border-b border-gray-100 pb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4 font-display">Blog</h1>
          <p className="text-gray-500 text-lg font-text">
            Updates, news, and insights from the RIM team.
          </p>
        </div>

        {/* Liste des articles */}
        <div className="flex flex-col">
          {posts.length > 0 ? (
            posts.map((post: any) => (
              <Link 
                key={post._id} 
                href={`/blog/${post.slug.current}`}
                className="group block py-6 border-b border-gray-100 hover:bg-gray-50/50 transition-colors -mx-4 px-4 rounded-xl"
              >
                <article className="flex flex-col sm:flex-row gap-2 sm:gap-8 items-baseline">
                  
                  {/* Date alignée à gauche (Style Magic UI Timeline) */}
                  <div className="text-sm text-gray-400 font-mono shrink-0 sm:w-32 uppercase tracking-wider">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>

                  {/* Contenu */}
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-semibold font-display group-hover:text-gray-600 transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-gray-500 text-sm leading-relaxed font-text max-w-lg">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center text-xs font-bold mt-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      Read more <ArrowRight className="w-3 h-3 ml-1" />
                    </div>
                  </div>
                </article>
              </Link>
            ))
          ) : (
            <div className="py-12 text-center text-gray-400 italic">
              No articles yet.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}