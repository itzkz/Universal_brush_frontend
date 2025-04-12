"use client";
import { Card, List, Tag } from "antd";
import "./index.css";
import Link from "next/link";
import TagList from "@/components/TagList";

interface Props {
    questionBankId?: number;
    questionList: API.QuestionVO[];
    cardTitle?: string;
}

/**
 * 题目列表组件
 * @param props
 * @constructor
 */
const QuestionList = (props: Props) => {
    const { questionList = [], cardTitle, questionBankId } = props;

    const tagList = (tags: string[] = []) => {
        return tags.map((tag) => {
            return <Tag key={tag}>{tag}</Tag>;
        });
    };


    return (
        <Card className="question-list" title={cardTitle}>
            <List
                dataSource={questionList}
                renderItem={(item) => (
                    <List.Item extra={<TagList tagList={item.tagList} />}>
                        <List.Item.Meta
                            title={
                                <Link
                                    href={
                                        questionBankId
                                            ? `/bank/${questionBankId}/question/${item.id}`
                                            : `/question/${item.id}`
                                    }
                                >
                                    {item.title}
                                </Link>
                            }
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default QuestionList;
