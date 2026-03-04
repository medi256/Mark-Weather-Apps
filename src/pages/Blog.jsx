import "./Blog.css";

export default function Blog() {
  return (
    <main className="blog-container">
      <header className="blog-header">
        <h1>Weather Insights Blog</h1>
        <p>
          Stay updated with the latest tips, tutorials, and insights about our
          weather app features and web development journey.
        </p>
      </header>

      <section className="blog-content">
        <article className="blog-post">
          <h2>🌍 Mapping the Weather</h2>
          <p>
            Our interactive map allows users to view weather patterns in
            real-time. Built with semantic HTML and responsive design in mind,
            the map ensures accessibility across all devices. Using Flexbox, the
            map adjusts seamlessly, and media queries optimize the experience
            for smaller screens.
          </p>
        </article>

        <article className="blog-post">
          <h2>📱 Responsive Design with Flexbox</h2>
          <p>
            Responsiveness is key in modern web apps. By applying a mobile-first
            approach, we ensure that the navbar, signup form, and forecast pages
            look great on both phones and desktops. Flexbox provides alignment
            and spacing that adapts dynamically without breaking layouts.
          </p>
        </article>

        <article className="blog-post">
          <h2>🔑 Secure & Simple Authentication</h2>
          <p>
            Our signup and login forms are styled with SCSS and follow
            responsive practices. Inputs expand naturally on smaller screens,
            while clear contrast and hover effects improve user experience.
            Using semantic HTML tags like <code>&lt;form&gt;</code> and{" "}
            <code>&lt;label&gt;</code> makes the app accessible for screen
            readers.
          </p>
        </article>

        <article className="blog-post">
          <h2>📊 7-Day & Hourly Forecasts</h2>
          <p>
            The weather forecasts are structured in a grid layout for clarity.
            Each card uses relative units (rem, %) instead of fixed pixels,
            ensuring smooth scaling. This keeps content readable and usable on
            any device, from wide monitors to compact phones.
          </p>
        </article>
      </section>
    </main>
  );
}
