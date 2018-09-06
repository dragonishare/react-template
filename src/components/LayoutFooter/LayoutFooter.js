import React from 'react';
import { Layout } from 'antd';
import './LayoutFooter.less';
const { Footer } = Layout;

export const LayoutFooter = () => {
  return (
    <Footer className="layout-footer">
      Anker Innovations Technology Ltd ©
      2018（推荐使用谷歌浏览器，可以获得更佳操作页面体验） 技术支持：soft-dev2
    </Footer>
  );
};
