"use server";
import Title from "antd/es/typography/Title";
import {Flex} from "antd";
import {listQuestionBankVoByPageUsingPost} from "@/api/questionBankController";
import QuestionBankList from "@/components/QuestionBankList";
import "./index.css";
import "../globals.css";


/**
 * 题库页面
 * @constructor
 */
export default async function QuestionBankPage() {
  let questionBankList = [];
  //题目数据不多直接全量获取
  const pageSize = 200;

  try {
    const questionBankRes = await listQuestionBankVoByPageUsingPost({
      pageSize,
      sortField: "createTime",
      sortOrder: "desc",
    });
    questionBankList = questionBankRes.data.records ?? [];
  } catch (e) {
    console.error("获取题库列表失败，" + e.message);
  }

  return (
    <div id="questionBankPage" className="max-width-content">
      <Flex justify="space-between" align="center">
        <Title level={3}>题库大全</Title>
      </Flex>
      <QuestionBankList questionBankList={questionBankList} />
    </div>
  );
}
