import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import { fetchCourseBySlug } from '../api';

export default function CourseDetail() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchCourseBySlug(slug)
      .then((data) => {
        if (cancelled) return;
        setCourse(data);
      })
      .catch(() => {
        if (cancelled) return;
        setCourse(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="course-page course-page-empty">
          <p>Loading...</p>
        </main>
      </>
    );
  }

  if (!course) {
    return (
      <>
        <Header />
        <main className="course-page course-page-empty">
          <p>Course not found.</p>
          <Link to="/class">Back to Courses</Link>
        </main>
      </>
    );
  }

  const heroVideoUrl = course.hero_video_url || '';
  const images = [
    course.image_1,
    course.image_2,
    course.image_3,
    course.image_4,
    course.image_5,
    course.image_6,
  ].filter(Boolean);

  return (
    <>
      <Header />
      <main className="course-page">
        {/* Hero video (same visual role as homepage carousel) */}
        <section className="course-hero">
          {heroVideoUrl ? (
            <div className="course-hero-media">
              <video
                src={heroVideoUrl}
                autoPlay
                muted
                loop
                playsInline
                className="course-hero-video"
                aria-label={`${course.title} hero video`}
              />
            </div>
          ) : (
            <div className="course-hero-placeholder" aria-hidden />
          )}
        </section>

        <div className="container course-body">
          <h1 className="course-title">{course.title}</h1>

          {course.intro_text && (
            <div className="course-intro">
              {course.intro_text.split(/\n\n+/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}

          {images.length > 0 && (
            <div className="course-gallery">
              {images.map((src, index) => (
                <div key={index} className="course-gallery-item">
                  <img src={src} alt={`${course.title} - ${index + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
