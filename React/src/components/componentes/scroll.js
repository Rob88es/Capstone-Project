import React, { useState, useEffect } from 'react';

function Scroll() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  // Función para obtener los posts
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      // Reemplaza esto con tu llamada a la API o lógica para obtener los posts
      const response = await fetch(`/api/posts?page=${page}`);
      const newPosts = await response.json();
      setPosts([...posts, ...newPosts]);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Efecto para cargar los posts iniciales
  useEffect(() => {
    fetchPosts();
  }, []);

  // Efecto para cargar más posts al llegar al final
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        setPage(page + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page]);

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <div key={post.id} className="post">
          <img src={post.imageUrl} alt={post.description} />
          <p>{post.description}</p>
        </div>
      ))}
      {isLoading && <div className="loading">Cargando más posts...</div>}
    </div>
  );
}

export default Scroll;