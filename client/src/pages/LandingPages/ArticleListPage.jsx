import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArticleList from '../../components/ArticleList';
import { fetchArticles } from '../../services/ArticleService';

function ArticleListPage() {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoading(true);
        const { data } = await fetchArticles();
        const activeArticles = (data?.articles || []).filter((article) => article.isActive);
        setArticleList(activeArticles);
      } catch (err) {
        console.error('Error loading articles', err);
        setError('Unable to load articles right now.');
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  if (isLoading) {
    return (
      <div className="page">
        <p className="muted">Loading articles...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <p className="eyebrow">Library</p>
        <h1>Articles crafted for UI-minded developers.</h1>
        <p className="lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Semper massa sit a, nunc volutpat
          elit tortor.
        </p>
      </div>

      {error ? (
        <p className="muted">{error}</p>
      ) : articleList.length > 0 ? (
        <ArticleList articles={articleList} />
      ) : (
        <p className="muted">No articles available right now.</p>
      )}

      <div className="cta-banner">
        <h3>Looking for more?</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel purus faucibus neque sed
          elementum feugiat.
        </p>
        <Link to="/about" className="button-link secondary">
          Meet the crew
        </Link>
      </div>
    </div>
  );
}

export default ArticleListPage;
