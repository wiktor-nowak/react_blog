import { useContext, useState, useEffect } from 'react';
import DataContext from './context/DataContext';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [search, setSearch] = useState('');
  const { posts, setSearchResults } = useContext(DataContext);

  useEffect(() => {
    const filteredResults = posts.filter(post =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));
      setSearchResults(filteredResults.reverse());
  }, [posts, search])

  return (
    <nav className='Nav'>
        <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
          <label htmlFor='search'>Search Posts</label>
          <input
            id="search"
            type="text"
            placeholder="Search Posts"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="post">Post</Link></li>
          <li><Link to="about">About</Link></li>
        </ul>
    </nav>
  )
}

export default Nav