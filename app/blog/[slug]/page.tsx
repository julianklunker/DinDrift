import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllPosts, getPost } from "@/lib/posts"
import { JsonLd } from "@/components/StructuredData"
import PostClient from "./PostClient"

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.da.title,
    description: post.da.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.da.title,
      description: post.da.description,
      type: "article",
      url: `https://dindrift.com/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.da.title,
    description: post.da.description,
    datePublished: post.date,
    inLanguage: "da-DK",
    author: { "@type": "Organization", name: "DinDrift" },
    publisher: {
      "@type": "Organization",
      name: "DinDrift",
      logo: { "@type": "ImageObject", url: "https://dindrift.com/dindriftlogosmall.png" },
    },
    mainEntityOfPage: `https://dindrift.com/blog/${slug}`,
  }

  return (
    <>
      <JsonLd data={articleSchema} />
      <PostClient slug={slug} />
    </>
  )
}
