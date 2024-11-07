"use client";
import {
  GithubFilled,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown, Input } from "antd";
import React, {useState} from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import "./index.css";
import GlobalFooter from "@/components/GlobalFooter";
import menus from "../../../config/menus";
import { RootState } from "@/stores";
import { useSelector } from "react-redux";
import Image from "next/image";
import getAccessibleMenus from "@/access/menuAccess";
import MdViewer from "@/components/MdViewer";
import MdEditor from "@/components/MdEditor";

const SearchInput = () => {
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        prefix={<SearchOutlined />}
        placeholder="搜索题目"
        variant="borderless"
      />
    </div>
  );
};

interface Props {
  children: React.ReactNode;
}

export default function BasicLayout({ children }: Props) {
    const [text, setText] = useState<string>('');
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const pathname = usePathname();
  return (
    <div
      id="basiclayout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProLayout
        title="万能刷题平台"
        layout="top"
        logo={
          <Image
              src="/assets/刷.png"
              height={32}
              width={32}
              alt="万能刷网站 - zkz"
          />}
        location={{
          pathname,
        }}
        avatarProps={{
          src: loginUser.userAvatar || "/assets/刷.png",
          size: "small",
          title: loginUser.userName || "万能刷",
          render: (props, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            <SearchInput key="search" />,
            <a key="github" href="https://github.com/itzkz" target="_blank">
              <GithubFilled key="GithubFilled" />,
            </a>,
          ];
        }}
        headerTitleRender={(logo, title, _) => {
          return (
            <a>
              {logo}
              {title}
            </a>
          );
        }}
        footerRender={(props) => {
          return <GlobalFooter></GlobalFooter>;
        }}
        menuDataRender={() => {
          return getAccessibleMenus(loginUser,menus);
        }}
        // 菜单渲染
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/"} target={item.target}>
            {dom}
          </Link>
        )}
      >
          <MdEditor value={text} onChange={setText} />
          <MdViewer value={text} />
        {children}
      </ProLayout>
    </div>
  );
}
