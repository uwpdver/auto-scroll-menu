import React from "react";
import styles from "./AutoScrollMenu.module.css";
import { useInstanceListRef } from "../utils";

const Content = React.forwardRef(
  ({ sections, sectionItemRender }, ref) => {
    const [instanceListRef, getInstanceRef] = useInstanceListRef();
    React.useImperativeHandle(ref, () => instanceListRef.current);

    return (
      <div className={styles.content}>
        {sections.map((item, index) => (
          <section
            key={index}
            ref={(ref) => getInstanceRef(ref, index)}
            data-index={index}
          >
            {typeof sectionItemRender === "function"
              ? sectionItemRender(item, index)
              : null}
          </section>
        ))}
        <div className={styles.empty}></div>
      </div>
    );
  }
);

export default React.memo(Content);
