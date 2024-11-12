"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {AppDispatch} from "@/stores";
import {useDispatch} from "react-redux";
import {ProForm} from "@ant-design/pro-form/lib";
import {userLoginUsingPost} from "@/api/userController";
import {message} from "antd";
import {setLoginUser} from "@/stores/loginUser";

const UserLoginPage: React.FC = () => {

  const [form] = ProForm.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();


  const doSubmit = async (values: API.UserLoginRequest) => {
    try {
      const res = await userLoginUsingPost(values);
      if (res.data) {
        message.success("登录成功");
        // 保存用户登录状态
        dispatch(setLoginUser(res.data));
        router.replace("/");
        form.resetFields();
      }
    } catch (e) {
      message.error("登录失败，" + e.message);
    }
  };

  return (
      <div id="userLoginPage">
    <LoginForm
        form={form}
      logo={<Image src="/assets/刷.png" alt="万能刷" width={100} height={50} />}
      title="万能刷"
      subTitle="最适合你的刷题平台"
        onFinish={doSubmit}
    >
      <ProFormText
        name="userAccount"
        fieldProps={{
          size: "large",
          prefix: <UserOutlined />,
        }}
        placeholder={"请输入用户账号"}
        rules={[
          {
            required: true,
            message: "请输入用户账号!",
          },
        ]}
      />
      <ProFormText.Password
        name="userPassword"
        fieldProps={{
          size: "large",
          prefix: <LockOutlined />,
        }}
        placeholder={"请输入密码"}
        rules={[
          {
            required: true,
            message: "请输入密码！",
          },
        ]}
      />
      <div
        style={{
          marginBlockEnd: 24,
          textAlign: "end",
        }}
      >
        还没有账号？
        <Link href={"/user/register"}>去注册</Link>
      </div>
    </LoginForm>
      </div>
  );

};
export default UserLoginPage;
