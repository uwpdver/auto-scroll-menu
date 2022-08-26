import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import AutoScrollMenu from './AutoScrollMenu';
import ListItem from "./ListItem";
import sectionStyles from "./Section.module.css";
import NavStyles from "./Nav.module.css";
import reportWebVitals from './reportWebVitals';

const sectionsLenght = 20;

const sectionsData = Array.from({ length: sectionsLenght }).map((_, index) => ({
  title: `这是这一节的标题-${index}`,
  shortName: `标题-${index}`,
  id: index,
  data: [
    {
      id: 1,
      name: 'Hey Kong',
      desc: '他看着窗外的风景 十月的天空很干净 桌上的文字太拥挤 想出去走走去散心 在胡思乱想在憧憬 他发呆总特别的专心 给未来的他写一封信 hey kong can you hear me？',
      thumbnail: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002Wd0zg0UqPYC_1.jpg',
    },
    {
      id: 2,
      name: 'Hey Kong',
      desc: '他看着窗外的风景 十月的天空很干净 桌上的文字太拥挤 想出去走走去散心 在胡思乱想在憧憬 他发呆总特别的专心 给未来的他写一封信 hey kong can you hear me？',
      thumbnail: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002Wd0zg0UqPYC_1.jpg',
    },
    {
      id: 3,
      name: 'Hey Kong',
      desc: '他看着窗外的风景 十月的天空很干净 桌上的文字太拥挤 想出去走走去散心 在胡思乱想在憧憬 他发呆总特别的专心 给未来的他写一封信 hey kong can you hear me？',
      thumbnail: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002Wd0zg0UqPYC_1.jpg',
    },
    {
      id: 4,
      name: 'Hey Kong',
      desc: '他看着窗外的风景 十月的天空很干净 桌上的文字太拥挤 想出去走走去散心 在胡思乱想在憧憬 他发呆总特别的专心 给未来的他写一封信 hey kong can you hear me？',
      thumbnail: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002Wd0zg0UqPYC_1.jpg',
    },
  ]
}));

const sectionItemRender = (item, index) => <>
  <header className={sectionStyles.sectionHeader}>{item.title}</header>
  <div className={sectionStyles.sectionBody}>
    <ul>
      {item.data.map(({ id, name, desc, thumbnail }) => (
        <li key={id}>
          <ListItem
            index={index}
            name={name}
            desc={desc}
            thumbnail={thumbnail}
          />
        </li>
      ))}
    </ul>
  </div>
</>

const navItemRender = (item, index, isActived) =>
  <div
    className={`${NavStyles.navItem} ${isActived && NavStyles.navItemActived}`}
  >
    {item.shortName}
  </div>;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AutoScrollMenu
      sectionItemRender={sectionItemRender}
      navItemRender={navItemRender}
      sections={sectionsData}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
