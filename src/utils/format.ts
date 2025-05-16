/**
 * Format a date in a relative time format (e.g., "2 days ago")
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  let counter;
  for (const [unit, seconds] of Object.entries(intervals)) {
    counter = Math.floor(diffInSeconds / seconds);
    if (counter > 0) {
      return counter === 1 ? `${counter} ${unit} ago` : `${counter} ${unit}s ago`;
    }
  }

  return 'just now';
};

/**
 * Format a number with k/m/b suffix for large numbers
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'b';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
};

/**
 * Get the appropriate color for a programming language
 */
export const getLanguageColor = (language: string | null): string => {
  if (!language) return '#e3e3e3';
  
  // A map of common languages and their associated colors on GitHub
  const languageColors: Record<string, string> = {
    "JavaScript": "#f1e05a",
    "TypeScript": "#2b7489",
    "Python": "#3572A5",
    "Java": "#b07219",
    "C#": "#178600",
    "PHP": "#4F5D95",
    "C++": "#f34b7d",
    "C": "#555555",
    "Ruby": "#701516",
    "Go": "#00ADD8",
    "Swift": "#ffac45",
    "Kotlin": "#F18E33",
    "Rust": "#dea584",
    "Dart": "#00B4AB",
    "Shell": "#89e051",
    "HTML": "#e34c26",
    "CSS": "#563d7c",
    "Vue": "#2c3e50",
    "Jupyter Notebook": "#DA5B0B",
  };
  
  return languageColors[language] || '#e3e3e3';
}; 