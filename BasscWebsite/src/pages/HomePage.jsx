import { useState, useEffect } from 'react';
import Header from '../components/Header';
import HeroCarousel from '../components/HeroCarousel';
import BoardSection from '../components/BoardSection';
import IntroductionCarousel from '../components/IntroductionCarousel';
import NewsList from '../components/NewsList';
import { fetchHomepage } from '../api';
import { defaultHomepage } from '../data';

function useHomepageData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchHomepage()
      .then((payload) => {
        if (cancelled) return;
        // 按字段合并：API 有数据的用 API，空的才用默认，避免“有一项为空就整页用默认”导致轮播图被覆盖
        const merged = {
          homePagePic: (payload.homePagePic && payload.homePagePic.length > 0) ? payload.homePagePic : defaultHomepage.homePagePic,
          boards: (payload.boards && payload.boards.length > 0) ? payload.boards : defaultHomepage.boards,
          introductions: (payload.introductions && payload.introductions.length > 0) ? payload.introductions : defaultHomepage.introductions,
          newsList: (payload.newsList && payload.newsList.length > 0) ? payload.newsList : defaultHomepage.newsList,
          navItems: (payload.navItems && payload.navItems.length > 0) ? payload.navItems : defaultHomepage.navItems,
        };
        const usedDefault = merged.homePagePic === defaultHomepage.homePagePic || merged.boards === defaultHomepage.boards || merged.introductions === defaultHomepage.introductions || merged.newsList === defaultHomepage.newsList;
        if (usedDefault) alert('Some content uses default data (no backend data for that section).');
        setData(merged);
      })
      .catch(() => {
        if (cancelled) return;
        alert('Cannot reach backend, using default homepage data.');
        setData(defaultHomepage);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { data, loading };
}

export default function HomePage() {
  const { data, loading } = useHomepageData();

  if (loading) {
    return (
      <>
        <Header navItems={defaultHomepage.navItems} />
        <main className="homepage-loading">
          <p>Loading...</p>
        </main>
      </>
    );
  }

  if (!data) return null;

  return (
    <>
      <Header navItems={data.navItems} />
      <main>
        <HeroCarousel homePagePic={data.homePagePic} />
        <BoardSection boards={data.boards} />
        <IntroductionCarousel introductions={data.introductions} />
        <NewsList newsList={data.newsList} />
      </main>
    </>
  );
}
