import React from 'react';
import styles from './AutoScrollMenu.module.css';
import Nav from './Nav';
import Content from './Content';

function AutoScrollMenu({sections, sectionItemRender, navItemRender}) {
  const [activeSectiondIdx, setActiveSectiondIdx] = React.useState(0);
  const navItemElsRef = React.useRef([]);
  const sectionElsRef = React.useRef([]);
  const firstIndexRef = React.useRef(0);

  React.useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.length === sections.length) {
      } else {
        entries.forEach(entry => {
          const idx = parseInt(entry.target.getAttribute('data-index'), 10);
          if(idx < firstIndexRef.current && entry.isIntersecting){
            firstIndexRef.current = idx;
          }
          if(idx === firstIndexRef.current && !entry.isIntersecting){
            firstIndexRef.current = idx + 1;
          }
        })
      }
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
    return ()=>{
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
  }, [activeSectiondIdx])

  const handleNavItemClick = (e, index) => {
    firstIndexRef.current = index;
    setActiveSectiondIdx(index)
    if (sectionElsRef && Array.isArray(sectionElsRef.current)) {
      const sectionEl = sectionElsRef.current[index];
      if (sectionEl instanceof HTMLElement) {
        sectionEl.scrollIntoView();
      }
    }
  }

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
