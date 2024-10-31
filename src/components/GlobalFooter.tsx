import React from "react";
import "./GlobalFooter.css";

/**
 * 全局底部栏组件
 *
 * @author zkz
 */
export default function GlobalFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="global-footer">
            <div>© {currentYear} 面试万能刷题平台</div>
            <div>
                <a href="https://github.com/itzkz" target="_blank">
                    作者：zkz
                </a>
            </div>
        </div>
    );
}
