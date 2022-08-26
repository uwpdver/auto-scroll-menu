import React, { useCallback } from 'react';
import styles from './AutoScrollMenu.module.css';
import Nav from './Nav';
import Content from './Content';

function AutoScrollMenu({ sections, sectionItemRender, navItemRender }) {
  const [activeSectiondIdx, setActiveSectiondIdx] = React.useState(0);
  const navItemElsRef = React.useRef([]);
  const sectionElsRef = React.useRef([]);
  const firstIndexRef = React.useRef(0);
  const isScrollingRef = React.useRef(false);

  React.useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.length === sections.length) {
        firstIndexRef.current = 0;
        return;
      };

      entries.forEach(entry => {
        const idx = parseInt(entry.target.getAttribute('data-index'), 10);
        if (isScrollingRef.current) {
          if (idx === firstIndexRef.current && entry.isIntersecting){
            isScrollingRef.current = false;
          }
        } else {
          if (idx < firstIndexRef.current && entry.isIntersecting) {
            firstIndexRef.current = idx;
          }
          if (idx === firstIndexRef.current && !entry.isIntersecting) {
            firstIndexRef.current = idx + 1;
          }
        }
      })
      setActiveSectiondIdx(firstIndexRef.current)
    }, {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    });
    if (Array.isArray(sectionElsRef.current)) {
      sectionElsRef.current.forEach((section) => {
        intersectionObserver.observe(section);
      })
    }
    return () => {
      intersectionObserver.disconnect();
    }
  }, [sections])

  React.useEffect(() => {
    if (navItemElsRef.current && Array.isArray(navItemElsRef.current)) {
      const navItemEl = navItemElsRef.current[activeSectiondIdx];
      if (navItemEl instanceof HTMLElement) {
        navItemEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    if (isScrollingRef.current && sectionElsRef && Array.isArray(sectionElsRef.current)) {
      const sectionEl = sectionElsRef.current[activeSectiondIdx];
      if (sectionEl instanceof HTMLElement) {
        sectionEl.scrollIntoView({ behavior: "smooth" });
      }
    }

  }, [activeSectiondIdx])

  const handleNavItemClick = React.useCallback((e, index) => {
    firstIndexRef.current = index;
    isScrollingRef.current = true;
    setActiveSectiondIdx(index)
  }, [])

  return (
    <div className={styles.container}>
      <Nav
        ref={navItemElsRef}
        sections={sections}
        onNavItemClick={handleNavItemClick}
        activeSectiondIdx={activeSectiondIdx}
        navItemRender={navItemRender}
      />
      <Content
        sections={sections}
        ref={sectionElsRef}
        sectionItemRender={sectionItemRender}
      />
    </div>
  );
}

export default AutoScrollMenu;
