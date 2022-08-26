import React from "react";
import styles from "./AutoScrollMenu.module.css";
import { useInstanceListRef } from "../utils";

const Nav = React.forwardRef(
  ({ activeSectiondIdx, sections, onNavItemClick, navItemRender }, ref) => {
    const [instanceListRef, getInstanceRef] = useInstanceListRef();
    React.useImperativeHandle(ref, () => instanceListRef.current);

    return (
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {sections.map((item, index) => (
            <li
              key={index}
              onClick={(e) => onNavItemClick(e, index)}
              ref={(ref) => getInstanceRef(ref, index)}
            >
              {typeof navItemRender === "function"
                ? navItemRender(item, index, index === activeSectiondIdx)
                : null}
            </li>
          ))}
        </ul>
      </nav>
    );
  }
);

export default React.memo(Nav);
