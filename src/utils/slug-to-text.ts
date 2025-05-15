export  function formatSlugToPhrase(slug: string): string {
    return slug
      .replace(/-/g, ' ')               // remplace les tirets par des espaces
      .replace(/^./, (c) => c.toUpperCase()); // met la première lettre en majuscule
  }