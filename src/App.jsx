import { useState, useEffect } from "react";

const categories = [
  { key: "all", label: "All", color: "#5F7A61" },
  { key: "web-dev", label: "Web Dev Journey", color: "#6B8F71" },
  { key: "social-media", label: "Social Media Marketing", color: "#7A9E9F" },
  { key: "public-speaking", label: "Public Speaking", color: "#A3B18A" },
  { key: "small-business", label: "Small Business", color: "#8DA3A3" },
  { key: "leadership", label: "Leadership", color: "#B8B5A6" },
  { key: "achievements", label: "Achievements", color: "#C2B280" },
];

const posts = [
  {
    id: "1",
    title: "Starting My Web Development Journey",
    text: "How I began learning coding and building my first projects.",
    categories: ["web-dev"],
    tags: ["coding", "learning"],
    featured: true,
  },
  {
    id: "2",
    title: "Growing on Social Media",
    text: "Tips and strategies to grow your audience organically.",
    categories: ["social-media"],
    tags: ["growth", "marketing"],
  },
  {
    id: "3",
    title: "Confidence in Public Speaking",
    text: "How to overcome fear and speak confidently.",
    categories: ["public-speaking"],
    tags: ["confidence", "skills"],
  },
  {
    id: "4",
    title: "Starting a Small Business",
    text: "Lessons from building a business from scratch.",
    categories: ["small-business"],
    tags: ["entrepreneurship"],
  },
  {
    id: "5",
    title: "Leadership Skills That Matter",
    text: "Traits of a great leader.",
    categories: ["leadership"],
    tags: ["mindset"],
  },
  {
    id: "6",
    title: "My Personal Achievements",
    text: "Milestones I’ve accomplished so far.",
    categories: ["achievements"],
    tags: ["success"],
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [sort, setSort] = useState("latest");
  const [likes, setLikes] = useState({});
  const [expandedPost, setExpandedPost] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved) setDarkMode(saved === "true");

    const savedLikes = localStorage.getItem("likes");
    if (savedLikes) setLikes(JSON.parse(savedLikes));
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
  }, [likes]);

  const toggleLike = (id) => {
    setLikes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const getReadingTime = (text) => {
    const words = text.split(" ").length;
    return Math.ceil(words / 200) + " min read";
  };

  let filteredPosts = posts
    .filter((post) =>
      activeCategory === "all"
        ? true
        : post.categories.includes(activeCategory)
    )
    .filter((post) => {
      const term = searchTerm.toLowerCase();
      return (
        post.title.toLowerCase().includes(term) ||
        post.text.toLowerCase().includes(term) ||
        post.tags?.some((tag) => tag.includes(term))
      );
    });

  if (sort === "az") {
    filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
  }

  // 🎨 Premium Theme
  const themeBg = darkMode ? "#1C1F26" : "#F6F5F2";
  const themeText = darkMode ? "#E5E7EB" : "#1F2937";
  const cardBg = darkMode ? "#252A33" : "#FFFFFF";

  return (
    <div style={{ background: themeBg, color: themeText, minHeight: "100vh" }}>
      {/* NAVBAR */}
      <nav
        className="navbar"
        style={{
          background: darkMode ? "#1C1F26" : "#FFFFFF",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <div className="container">
          <span className="fw-bold fs-5">My Blog</span>

          <button
            className="btn"
            style={{
              border: "1px solid #5F7A61",
              color: darkMode ? "#E5E7EB" : "#5F7A61",
            }}
            onClick={toggleDarkMode}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </nav>

      <div className="container py-4">
        <h1 className="mb-4 fw-bold">My Blog</h1>

        {/* CONTROLS */}
        <div className="d-flex flex-wrap gap-2 mb-3">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              style={{
                background: activeCategory === cat.key ? cat.color : "transparent",
                color: activeCategory === cat.key ? "#fff" : cat.color,
                border: `1px solid ${cat.color}`,
                borderRadius: "20px",
                padding: "5px 12px",
                fontSize: "14px",
              }}
            >
              {cat.label}
            </button>
          ))}

          <select
            className="form-select w-auto"
            onChange={(e) => setSort(e.target.value)}
            style={{ borderRadius: "20px" }}
          >
            <option value="latest">Latest</option>
            <option value="az">A-Z</option>
          </select>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ borderRadius: "12px" }}
        />

        {/* POSTS */}
        <div className="row g-4">
          {filteredPosts.map((post) => (
            <div className="col-md-4" key={post.id}>
              <div
                style={{
                  background: cardBg,
                  borderRadius: "20px",
                  padding: "20px",
                  border: "1px solid rgba(0,0,0,0.05)",
                  boxShadow: darkMode
                    ? "0 10px 30px rgba(0,0,0,0.4)"
                    : "0 10px 30px rgba(0,0,0,0.05)",
                  transition: "0.3s",
                  cursor: "pointer",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "translateY(-6px)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <h5 className="fw-bold">{post.title}</h5>

                <small style={{ opacity: 0.7 }}>
                  {getReadingTime(post.text)}
                </small>

                <p className="mt-2">
                  {expandedPost === post.id
                    ? post.text
                    : post.text.slice(0, 80) + "..."}
                </p>

                <button
                  className="btn btn-link p-0"
                  onClick={() =>
                    setExpandedPost(
                      expandedPost === post.id ? null : post.id
                    )
                  }
                >
                  {expandedPost === post.id ? "Show less" : "Read more"}
                </button>

                {/* TAGS */}
                <div className="mt-2">
                  {post.tags?.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        background: "#E7ECEA",
                        color: "#5F7A61",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        marginRight: "5px",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* LIKE */}
                <button
                  onClick={() => toggleLike(post.id)}
                  style={{
                    marginTop: "10px",
                    border: "1px solid #5F7A61",
                    background: likes[post.id] ? "#5F7A61" : "transparent",
                    color: likes[post.id] ? "#fff" : "#5F7A61",
                    borderRadius: "10px",
                    padding: "5px 10px",
                  }}
                >
                  {likes[post.id] ? "❤️ Liked" : "🤍 Like"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <p className="text-center mt-4" style={{ opacity: 0.6 }}>
            No posts found.
          </p>
        )}
      </div>

      {/* FOOTER */}
      <footer
        className="text-center py-3"
        style={{
          background: darkMode ? "#1C1F26" : "#FFFFFF",
          borderTop: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        © {new Date().getFullYear()} My Blog
      </footer>
    </div>
  );
}