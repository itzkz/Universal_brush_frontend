"use client";
import {
  GithubFilled,
  LogoutOutlined,
  SearchOutlined, UserOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown, Input, message } from "antd";
import React, { useState } from "react";
import Link from "next/link";
import "./index.css";
import GlobalFooter from "@/components/GlobalFooter";
import menus from "../../../config/menus";
import { RootState } from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import getAccessibleMenus from "@/access/menuAccess";
import { userLogoutUsingPost } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";
import { usePathname, useRouter } from "next/navigation";
import { DEFAULT_USER } from "@/constants/user";
import SearchInput from "@/ layouts/BasicLayout/components/SearchInput";

interface Props {
  children: React.ReactNode;
}

export default function BasicLayout({ children }: Props) {
  const [text, setText] = useState<string>("");
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const userLogout = async () => {
    try {
      await userLogoutUsingPost();
      message.success("已退出登录");
      dispatch(setLoginUser(DEFAULT_USER));
      router.push("/user/login");
    } catch (e) {
      message.error("操作失败，" + e.message);
    }
  };

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
          />
        }
        location={{
          pathname,
        }}
        avatarProps={{
          src: loginUser.userAvatar || "/assets/刷.png",
          size: "small",
          title: loginUser.userName || "万能刷",
          render: (props, dom) => {
            if (!loginUser.id) {
              return (
                  <div
                      onClick={() => {
                        router.push("/user/login");
                      }}
                  >
                    {dom}
                  </div>
              );
            }
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "userCenter",
                      icon: <UserOutlined />,
                      label: "个人中心",
                    },
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                  ],
                  onClick: async (event: { key: React.Key }) => {
                    const { key } = event;
                    if (key === "logout") {
                      await userLogout();
                    } else if (key === "userCenter") {
                      router.push("/user/center");
                    }
                  },
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
          return getAccessibleMenus(loginUser, menus);
        }}
        // 菜单渲染
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/"} target={item.target}>
            {dom}
          </Link>
        )}
      >
        {children}
      </ProLayout>
    </div>
  );
}
