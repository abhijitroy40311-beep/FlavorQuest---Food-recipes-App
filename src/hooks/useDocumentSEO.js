import { useEffect } from "react";

export default function useDocumentSEO({ title, description, image, schema }) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | Chefist`;
      updateMetaTag('property="og:title"', `${title} | Chefist`);
    }

    if (description) {
      updateMetaTag('name="description"', description);
      updateMetaTag('property="og:description"', description);
    }

    if (image) {
      updateMetaTag('property="og:image"', image);
    }

    if (schema) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.innerHTML = JSON.stringify(schema);
    }

    return () => {
      // Optional: Reset tags on unmount
    };
  }, [title, description, image, schema]);
}

function updateMetaTag(selector, content) {
  let meta = document.querySelector(`meta[${selector}]`);
  if (!meta) {
    meta = document.createElement("meta");

    // Parse selector to extract attributes
    // e.g. property="og:title" -> key: property, value: og:title
    const match = selector.match(/([^=]+)="([^"]+)"/);
    if (match) {
      meta.setAttribute(match[1], match[2]);
    }

    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}
