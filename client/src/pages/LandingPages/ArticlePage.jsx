import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchArticleByName } from '../../services/ArticleService';
import NotFoundPage from '../NotFoundPage.jsx';

function ArticlePage() {
  const { name } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setIsLoading(true);
        setError('');
        const { data } = await fetchArticleByName(name);
        const fetchedArticle = data?.article;
        if (fetchedArticle && fetchedArticle.isActive !== false) {
          setArticle(fetchedArticle);
        } else {
          setArticle(null);
        }
      } catch (err) {
        if (err?.response?.status === 404) {
          setArticle(null);
        } else {
          console.error('Error loading article', err);
          setError('Unable to load this article right now.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
  }, [name]);

  if (isLoading) {
    return (
      <div className="page">
        <p className="muted">Loading article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <p className="muted">{error}</p>
      </div>
    );
  }

  if (!article) {
    return <NotFoundPage />;
  }

  const contentArray = Array.isArray(article.content)
    ? article.content
    : article.content
      ? [article.content]
      : [];

  const words = contentArray.join(' ').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(2, Math.ceil(words / 70));

  return (
    <div className="page article-page">
      <div className="page-header">
        <p className="eyebrow">Article</p>
        <h1>{article.title}</h1>
        <div className="article-meta">
          <span className="pill">React</span>
          <span className="muted">{minutes} min read</span>
        </div>
        <p className="lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus egestas blandit
          fringilla platea quam vel.
        </p>
      </div>

      <div className="article-body">
        {contentArray.map((paragraph, idx) => (
          <p key={`${article.name}-${idx}`}>{paragraph}</p>
        ))}
        <div className="card callout">
          <h3>Want another angle?</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit amet nisl eu condimentum
            tincidunt pulvinar sed commodo.
          </p>
          <Link to="/articles" className="button-link primary">
            Browse more articles
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;
