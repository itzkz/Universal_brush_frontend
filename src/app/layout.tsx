import BasicLayout from "@/ layouts/BasicLayout";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import React from "react";
import GlobalFooter from "@/components/GlobalFooter";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh">
        <body>
        <AntdRegistry>
            <BasicLayout>{children}</BasicLayout>
        </AntdRegistry>
        </body>
        </html>
    );
}
