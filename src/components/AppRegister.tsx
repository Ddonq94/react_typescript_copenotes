import { Button, Form, Input, message, notification } from "antd";
import GlobalServices from "../services/GlobalServices";
import { Icomponent } from "../types/types";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import usefulServices from "../services/usefulServices";

function AppRegister({ testID = "AppRegister" }: Icomponent) {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const validate = async () => {
    try {
      const a = await form.validateFields();
      return true;
    } catch (e: any) {
      message.error(
        "One or more fields have errors. Please double check and try again."
      );
      return false;
    }
  };

  const onSubmit = async () => {
    let isValid = await validate();
    if (isValid) {
      try {
        let res = await GlobalServices.signup(form.getFieldsValue());
        if (res.status === "success") {
          notification.open({
            message: "Add user",
            description: `New User successfully created!`,
            icon: (
              <CheckCircleTwoTone
                data-testid="CheckCircleOutlined"
                twoToneColor="#52c41a"
              />
            ),
          });
        } else {
          notification.open({
            message: "Add user error",
            description: usefulServices.capitalizeFirstLetter(res.status),
            icon: (
              <CloseCircleTwoTone
                data-testid="CcxIconCloseCircleTwoTone"
                twoToneColor="#eb2f96"
              />
            ),
          });
        }
      } catch (err: any) {
        notification.open({
          message: "Add user error",
          description: err,
          icon: (
            <CloseCircleTwoTone
              data-testid="CcxIconCloseCircleTwoTone"
              twoToneColor="#eb2f96"
            />
          ),
        });
      }
    }
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };

  return (
    <section data-testid={testID} className="AppRegister">
      <h3>Click to sign up for copenotes</h3>

      <Form
        layout={"vertical"}
        form={form}
        validateMessages={validateMessages}
        data-testid={`${testID}Form`}
      >
        <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <div className="AppRegisterButtons">
            <Button type="primary" htmlType="submit" onClick={onSubmit}>
              Submit
            </Button>

            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </div>
        </Form.Item>
      </Form>
    </section>
  );
}

export default AppRegister;
