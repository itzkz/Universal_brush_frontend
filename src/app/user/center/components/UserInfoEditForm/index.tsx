import { Button, Form, Input, message } from "antd";
import { editUserUsingPost } from "@/api/userController";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores";
import { setLoginUser } from "@/stores/loginUser";

interface Props {
    user: API.LoginUserVO;
}

/**
 * 用户信息编辑表单
 * @constructor
 */
const UserInfoEditForm = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const [form] = Form.useForm();
    const { user } = props;

    React.useEffect(() => {
        form.setFieldsValue(user);
    }, [user]); // 添加依赖项，当user变化时更新表单值

    /**
     * 提交
     * @param values
     */
    const doSubmit = async (values: API.UserEditRequest) => {
        const hide = message.loading("正在操作");
        try {
            await editUserUsingPost(values);
            hide();
            message.success("操作成功");
            dispatch(setLoginUser({ ...user, ...values }));
        } catch (error: any) {
            hide();
            message.error("操作失败，" + error.message);
        }
    };

    // 手机号验证规则
    const phoneRules = [
        { required: true, message: "请输入手机号" },
        { pattern: /^1[3-9]\d{9}$/, message: "请输入有效的11位手机号" }
    ];

    // 邮箱验证规则
    const emailRules = [
        { required: true, message: "请输入邮箱" },
        { type: "email", message: "请输入有效的邮箱地址" }
    ];

    // 通用必填规则
    const requiredRule = (fieldName: string) => [
        { required: true, message: `请输入${fieldName}` }
    ];

    return (
        <Form
            form={form}
            style={{ marginTop: 24, maxWidth: 480 }}
            labelCol={{ span: 4 }}
            labelAlign="left"
            onFinish={doSubmit}
        >
            <Form.Item label="手机号" name="phoneNumber" rules={phoneRules}>
                <Input placeholder="请输入11位手机号" maxLength={11} />
            </Form.Item>

            <Form.Item label="邮箱" name="email" rules={emailRules}>
                <Input placeholder="请输入邮箱" />
            </Form.Item>

            <Form.Item
                label="年级"
                name="grade"
                rules={requiredRule("年级")}
            >
                <Input placeholder="请输入年级（如：大三/2023级）" />
            </Form.Item>

            <Form.Item
                label="工作经验"
                name="workExperience"
                rules={requiredRule("工作经验")}
            >
                <Input placeholder="请输入工作经验（如：3年工作经验）" />
            </Form.Item>

            <Form.Item
                label="擅长方向"
                name="expertiseDirection"
                rules={requiredRule("擅长方向")}
            >
                <Input placeholder="请输入擅长方向（如：前端开发）" />
            </Form.Item>

            <Form.Item>
                <Button style={{ width: 180 }} type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UserInfoEditForm;