"use server";
import Title from "antd/es/typography/Title";
import { Flex } from "antd";
import "./index.css";

import {
  listQuestionVoByPageUsingPost,
  searchQuestionVoByPageUsingPost,
} from "@/api/questionController";
import QuestionTable from "@/components/QuestionTable/page";

/**
 * 题目页面
 * @constructor
 */
export default async function QuestionsPage({ searchParams }) {
  // 获取 url 的查询参数
  const { q: searchText } = searchParams;
  let questionList = [];
  let total = 0;

  try {
    const questionsRes = await searchQuestionVoByPageUsingPost({
      searchText,
      pageSize: 12,
      sortField: "_score",
      sortOrder: "descend",
    });
    questionList = questionsRes.data.records ?? [];
    total = questionsRes.data.total ?? 0;
  } catch (e) {
    console.error("获取题库列表失败，" + e.message);
  }

  return (
    <div id="questionsPage" className="max-width-content">
      <Flex justify="space-between" align="center">
        <Title level={3}>题目大全</Title>
      </Flex>
      <QuestionTable
        defaultQuestionList={questionList}
        defaultTotal={total}
        defaultSearchParams={{
          title: searchText,
        }}
      />
    </div>
  );
}
