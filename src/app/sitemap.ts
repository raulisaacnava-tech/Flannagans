import type { MetadataRoute } from "next";

const siteUrl = "https://flannagans.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${siteUrl}/logo.webp`],
    },
    {
      url: `${siteUrl}/menu`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [`${siteUrl}/fotosmenu/Hamburguesas/lasmashzilla.webp`],
      videos: [
        {
          title: "La Smashzilla de Flanagans Burguer",
          thumbnail_loc: `${siteUrl}/fotosmenu/Hamburguesas/lasmashzilla.webp`,
          description:
            "Video corto de una hamburguesa premium en la carta digital de Flanagans Burguer.",
        },
      ],
    },
  ];
}
