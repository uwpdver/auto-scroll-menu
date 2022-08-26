import listItemStyles from "./ListItem.module.css";

const ListItem = ({ index, name, desc, thumbnail }) => {
  return (
    <div className={listItemStyles.container}>
      <div className={listItemStyles.thumbnailContainer}>
        <img className={listItemStyles.thumbnail} src={thumbnail} alt="" />
      </div>
      <div>
        <div className={listItemStyles.name}>{name}</div>
        <p className={listItemStyles.desc}>{desc}</p>
      </div>
    </div>
  );
};

export default ListItem;
