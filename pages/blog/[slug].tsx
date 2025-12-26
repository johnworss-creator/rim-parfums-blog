import { client } from '../../lib/sanity';
import { Navbar } from '../../components/Navbar'; 
import { PortableText } from '@portabletext/react';
import Head from 'next/head';
import Link from 'next/link'
// --- STYLE DU CONTENU RICHE (La touche "Magic UI") ---
const ptComponents = {
  block: {
    // Gros titres H1 (SF Pro Display)
    h1: ({children}: any) => <h1 className="font-display text-3xl font-bold mt-12 mb-6 tracking-tight text-gray-900">{children}</h1>,
    
    // Sous-titres H2 (SF Pro Display)
    h2: ({children}: any) => <h2 className="font-display text-2xl font-semibold mt-10 mb-4 tracking-tight text-gray-900">{children}</h2>,
    
    // Sous-titres H3 (SF Pro Display)
    h3: ({children}: any) => <h3 className="font-display text-xl font-semibold mt-8 mb-3 text-gray-900">{children}</h3>,
    
    // Paragraphes normaux (SF Pro Text / Inter)
    normal: ({children}: any) => <p className="font-text mb-6 text-gray-700 leading-7 text-[17px]">{children}</p>,
    
    // Citations
    blockquote: ({children}: any) => <blockquote className="font-display border-l-2 border-black pl-6 italic my-8 text-gray-800 font-medium text-lg">{children}</blockquote>,
  },
  list: {
    bullet: ({children}: any) => <ul className="font-text list-disc pl-5 mb-6 space-y-2 text-gray-700 leading-7">{children}</ul>,
    number: ({children}: any) => <ol className="font-text list-decimal pl-5 mb-6 space-y-2 text-gray-700 leading-7">{children}</ol>,
  },
  types: {
    image: ({value}: any) => {
        if (!value?.asset?._ref) return null;
        return (
          <div className="my-8 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
             <img
                src={`https://cdn.sanity.io/images/g9fpbcny/production/${value.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`} 
                alt={value.alt || ' '}
                className="w-full h-auto object-cover"
             />
             {value.caption && <p className="text-center text-xs text-gray-400 mt-2">{value.caption}</p>}
          </div>
        );
      }
  }
};

export default function BlogPost({ post }: any) {
  if (!post) return <div className="flex h-screen items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <Head>
        <title>{post.title} | RIM Blog</title>
      </Head>
      
      <Navbar />

      <article className="pt-32 pb-24 max-w-[680px] mx-auto px-6">
        
        {/* En-tête de l'article */}
        <div className="mb-10">
            <Link href="/blog" className="text-xs font-bold text-gray-400 hover:text-black mb-6 block w-fit transition-colors">
                ← BACK TO BLOG
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 font-display leading-[1.1]">
                {post.title}
            </h1>
            
            <div className="flex items-center gap-3 text-sm text-gray-500 font-mono border-b border-gray-100 pb-8 w-full">
                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span>•</span>
                <span>RIM Team</span>
            </div>
        </div>

        {/* Image Principale (Cover) */}
        {post.imageUrl && (
            <div className="mb-10 w-full aspect-video rounded-xl overflow-hidden shadow-sm bg-gray-50 border border-gray-100">
                <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="object-cover w-full h-full"
                />
            </div>
        )}

        {/* CORPS DE L'ARTICLE (Injecté par Sanity) */}
        <div className="font-text">
            <PortableText value={post.body} components={ptComponents} />
        </div>

        {/* Pied de page */}
        <hr className="my-12 border-gray-100" />
        <div className="text-center">
            <p className="text-sm text-gray-400 mb-4">Thanks for reading.</p>
            <Link href="/blog" className="inline-block px-6 py-2 bg-black text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-all">
                Read more articles
            </Link>
        </div>

      </article>
    </div>
  );
}

// --- LOGIQUE BACKEND (Ne pas toucher) ---

export async function getStaticPaths() {
  const paths = await client.fetch(`*[_type == "post" && defined(slug.current)][].slug.current`);
  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context: any) {
  const { slug } = context.params;
  // On récupère le titre, la date, le corps du texte et l'URL de l'image principale
  const post = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0]{
      title,
      publishedAt,
      body,
      "imageUrl": mainImage.asset->url
    }
  `, { slug });

  return {
    props: { post },
    revalidate: 10,
  };
}