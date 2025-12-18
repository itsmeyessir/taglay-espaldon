import React from 'react';
import { Link } from 'react-router-dom';
import articles from '../../article-content';

function HomePage() {
  const featuredArticles = articles.slice(0, 3);

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Frontend studio</p>
          <h1>Polished UI patterns without the corporate beige.</h1>
          <p className="lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec euismod posuere a aliquam
            mattis ac sed nibh tincidunt non ultrices.
          </p>
          <div className="hero-actions">
            <Link to="/articles" className="button-link primary">
              Browse articles
            </Link>
            <Link to="/about" className="button-link secondary">
              About the team
            </Link>
          </div>
          <div className="stats">
            <div className="stat">
              <strong>{articles.length}+</strong>
              <span>React breakdowns</span>
            </div>
            <div className="stat">
              <strong>3</strong>
              <span>UI micro-guides</span>
            </div>
            <div className="stat">
              <strong>Zero</strong>
              <span>fluff allowed</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-panel">
            <img
              src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80"
              alt="Design desk with colorful UI elements"
            />
            <p className="muted">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices in velit varius
              rutrum vitae arcu.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Highlights</p>
            <h2>What you get inside.</h2>
          </div>
          <span className="muted">Clean patterns, real-world snippets.</span>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">UI</div>
            <h3>Layout recipes</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac sed augue sem sit bibendum
              at dui varius.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">FE</div>
            <h3>React clarity</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies suspendisse
              pellentesque auctor habitant amet.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">UX</div>
            <h3>Microcopy cues</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis nisl ultricies
              dignissim vulputate est.
            </p>
          </div>
        </div>
      </section>

      <section className="articles-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Articles</p>
            <h2>Latest reads.</h2>
          </div>
          <Link to="/articles" className="button-link secondary">
            View all
          </Link>
        </div>
        <div className="article-preview-grid">
          {featuredArticles.map((article) => (
            <div key={article.name} className="article-preview">
              <div className="article-meta">
                <span className="pill">React</span>
                <span className="muted">{article.content[0].substring(0, 30)}...</span>
              </div>
              <h3>{article.title}</h3>
              <p>{article.content[0].substring(0, 150)}...</p>
              <Link to={`/articles/${article.name}`} className="button-link secondary">
                Read article
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
