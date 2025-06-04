import { useState, useEffect } from "react";

const categories = [
  { key: "all", label: "All", color: "primary" },
  { key: "ai", label: "Artificial Intelligence", color: "success" },
  { key: "digital-market", label: "Digital Market", color: "info" },
  { key: "cloud", label: "Cloud", color: "warning" },
];

const posts = [
  {
    id: "row-3",
    title: "The future of AI: How to build responsible AI systems",
    text: "This article is the first in a series on the future of AI, exploring the challenges and opportunities for building responsible AI technologies.",
    img: "https://source.unsplash.com/600x400/?technology,ai",
    categories: ["ai"],
  },
  {
    id: "row-4",
    title: "The Future of Work: What Will It Look Like?",
    text: "Explore key trends shaping the future workplace and how digital transformation is impacting jobs and skills.",
    img: "https://source.unsplash.com/600x400/?office,work",
    categories: ["digital-market"],
  },
  {
    id: "row-5",
    title: "The Future of Cloud Computing",
    text: "Dive into the evolving landscape of cloud technologies and what it means for businesses and developers.",
    img: "https://source.unsplash.com/600x400/?cloud,computing",
    categories: ["cloud"],
  },
  {
    id: "row-6",
    title: "AI and the Workforce: Preparing for Change",
    text: "Discover how AI is transforming industries and how workers can prepare for the changes ahead.",
    img: "https://source.unsplash.com/600x400/?robot,workforce",
    categories: ["ai"],
  },
  {
    id: "row-7",
    title: "AI in Everyday Life: Enhancing Daily Experiences",
    text: "Explore ways AI is seamlessly integrated into our daily lives, from smart assistants to healthcare innovations.",
    img: "https://source.unsplash.com/600x400/?ai,life",
    categories: ["ai"],
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Load saved preference
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved) setDarkMode(saved === "true");
  }, []);

  // Save preference
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const filteredPosts = posts
    .filter((post) =>
      activeCategory === "all"
        ? true
        : post.categories.includes(activeCategory)
    )
    .filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const themeBg = darkMode ? "bg-dark" : "bg-light";
  const themeText = darkMode ? "text-light" : "text-dark";
  const cardTheme = darkMode ? "bg-secondary text-light" : "bg-white text-dark";

  return (
    <div className={`${themeBg} ${themeText} min-vh-100`}>
      <nav
        className={`navbar navbar-expand-lg ${
          darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
        }`}
      >
        <div className="container">
          <a className="navbar-brand" href="#">
            Blog
          </a>
          <button
            className="btn btn-outline-secondary"
            onClick={toggleDarkMode}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </nav>

      <div className="container py-4">
        <h1 className="mb-3">Tech Blog</h1>

        {/* Category Buttons */}
        <div className="mb-4">
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`btn btn-${cat.color} me-2 mb-2 ${
                activeCategory === cat.key ? "active" : ""
              }`}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Blog Posts */}
        <div className="row">
          {filteredPosts.map((post) => (
            <div className="col-md-4 mb-4" key={post.id}>
              <div className={`card h-100 shadow ${cardTheme}`}>
                <img
                  src={post.img}
                  className="card-img-top"
                  alt={post.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.text}</p>
                </div>
              </div>
            </div>
          ))}
          {filteredPosts.length === 0 && (
            <p className="text-muted">No posts found.</p>
          )}
        </div>
      </div>

      <footer
        className={`text-center py-3 mt-auto ${
          darkMode ? "bg-dark text-light" : "bg-light text-dark"
        }`}
      >
        © {new Date().getFullYear()} Tech Blog. All rights reserved.
      </footer>
    </div>
  );
}
