"use client";

import {
  listQuestionVoByPageUsingPost,
  searchQuestionVoByPageUsingPost,
} from "@/api/questionController";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import React, { useRef, useState } from "react";
import "./index.css";
import TagList from "@/components/TagList";
import { List, TablePaginationConfig } from "antd";
import Link from "next/link";

interface Props {
  //默认值 用户服务端展示的数据
  defaultQuestionList?: API.QuestionVO[];
  defaultTotal?: number;
  //默认搜索条件
  defaultSearchParams?: API.QuestionQueryRequest;
}

/**
 * 题目表格页面
 *
 * @constructor
 */
const QuestionTable: React.FC = (props: Props) => {
  //题目列表
  const { defaultQuestionList, defaultTotal, defaultSearchParams = {} } = props;
  const actionRef = useRef<ActionType>();
  const [questionList, setQuestionList] = useState<API.QuestionVO[]>(
    defaultQuestionList || [],
  );
  // 用于判断是否首次加载
  const [init, setInit] = useState<boolean>(true);
  //题目总数
  const [total, setTotal] = useState<number>(defaultTotal || 0);
  /**
   * 表格列配置
   */
  const columns: ProColumns<API.QuestionVO>[] = [
    {
      title: "搜索",
      dataIndex: "searchText",
      valueType: "text",
      hideInTable: true,
    },
    {
      title: "标题",
      dataIndex: "title",
      valueType: "text",
      hideInSearch: true,
      render: (_, record) => {
        return <Link href={`/question/${record.id}`}>{record.title}</Link>;
      },
    },

    {
      title: "标签",
      dataIndex: "tagList",
      valueType: "select",
      fieldProps: {
        mode: "tagList",
      },
      render: (_, record) => {
        return <TagList tagList={record.tagList} />;
      },
    },
  ];

  return (
    <div className="questionTable">
      <ProTable<API.QuestionVO>
        actionRef={actionRef}
        size="large"
        search={{
          labelWidth: "auto",
        }}
        dataSource={questionList}
        form={{
          initialValues: defaultSearchParams,
        }}
        pagination={{
          pageSize: 12,
          showTotal: (total) => `总共${total}条`,
          showSizeChanger: false,
          total,
        }}
        request={async (params, sort, filter) => {
          // 首次请求
          if (init) {
            setInit(false);
            // 如果已有外层传来的默认数据，无需再次查询
            if (defaultQuestionList && defaultTotal) {
              return;
            }
          }
          const sortField = Object.keys(sort)?.[0] || "createTime";
          const sortOrder = sort?.[sortField] ?? "descend";

          const { data, code } = await searchQuestionVoByPageUsingPost({
            ...params,
            sortField:"_score",
            sortOrder,
            ...filter,
          } as API.QuestionQueryRequest);
          //更新数据
          const newData = data?.records || [];
          const newTotal = data?.total || 0;
          //更新效果
          setTotal(newTotal);
          setQuestionList(newData);
          return {
            success: code === 0,
            data: newData,
            total: newTotal,
          };
        }}
        columns={columns}
      />
    </div>
  );
};
export default QuestionTable;
