import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import { useState } from "react";
import usefulServices from "../services/usefulServices";
import GlobalServices from "../services/GlobalServices";
import { Icomponent, ISpecialCountryFields } from "../types/types";
import moment from "moment";

function AppRegister({ testID = "AppRegister" }: Icomponent) {
  const [form] = Form.useForm();
  const { Option } = Select;

  const [country, setCountry] = useState<ISpecialCountryFields>();

  const onReset = () => {
    form.resetFields();
  };

  const onSubmit = () => {
    GlobalServices.signup({
      ...form.getFieldsValue(),
      dob: form.getFieldsValue().dob.format("DD/MM/YYYY"),
    });
  };

  const handleCountryChange = (e: any) => {
    setCountry(usefulServices.getCountryByName(e));
  };

  const disabledDate = (current: any) => {
    // Can not select days after 10 years before today
    // assumption: that we only employ people 10 years and older
    return current && current > moment().subtract(10, "y");
  };

  return (
    <section data-testid={testID}>
      <Form layout={"vertical"} form={form} data-testid={`${testID}Form`}>
        <Form.Item
          name="country"
          label="Country"
          rules={[{ required: true }]}
          data-testid={`${testID}country`}
        >
          <Select
            placeholder="Select a country to begin"
            allowClear
            onChange={handleCountryChange}
          >
            {usefulServices
              .getCountryNames()
              .map((country: string, index: number) => (
                <Option key={index + "country"} value={country}>
                  {usefulServices.capitalizeFirstLetter(country)}
                </Option>
              ))}
          </Select>
        </Form.Item>

        {country && (
          <>
            {country.firstName && (
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            )}

            {country.lastName && (
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            )}

            {country.dob && (
              <Form.Item
                name="dob"
                label="Date of Birth"
                rules={[{ required: true }]}
              >
                <DatePicker disabledDate={disabledDate} className="fullWidth" />
              </Form.Item>
            )}

            {country.holidayAllowance && (
              <Form.Item
                name="holidayAllowance"
                label="Holiday Allowance (Days)"
                rules={[{ required: true }]}
              >
                <InputNumber
                  min={
                    country?.minHolidayAllowance
                      ? `${country?.minHolidayAllowance}`
                      : undefined
                  }
                  max={
                    country?.maxHolidayAllowance
                      ? `${country?.maxHolidayAllowance}`
                      : undefined
                  }
                  formatter={(value: string | undefined) =>
                    value ? `${value}` : ``
                  }
                  parser={(value: string | undefined) =>
                    value ? value.replace(" ", "") : ""
                  }
                  className="fullWidth"
                />
              </Form.Item>
            )}

            {country.maritalStatus && (
              <Form.Item
                name="maritalStatus"
                label="Marital Status"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select marital status" allowClear>
                  {usefulServices
                    .getMaritalSatuses()
                    .map((status: string, index: number) => (
                      <Option key={index + "status"} value={status}>
                        {usefulServices.capitalizeFirstLetter(status)}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            )}

            {country.SIN && (
              <Form.Item
                name="SIN"
                label="Social insurance number"
                rules={[{ required: true }]}
              >
                <InputNumber
                  formatter={(value: string | undefined) =>
                    value ? `${value}` : ``
                  }
                  parser={(value: string | undefined) =>
                    value ? value.replace(" ", "") : ""
                  }
                  className="fullWidth"
                />
              </Form.Item>
            )}

            {country.numberOfChildren && (
              <Form.Item
                name="numberOfChildren"
                label="Number Of Children"
                rules={[{ required: true }]}
              >
                <InputNumber
                  formatter={(value: string | undefined) =>
                    value ? `${value}` : ``
                  }
                  parser={(value: string | undefined) =>
                    value ? value.replace(" ", "") : ""
                  }
                  className="fullWidth"
                />
              </Form.Item>
            )}

            {country.workingHours && (
              <Form.Item
                name="workingHours"
                label="Working Hours"
                rules={[{ required: true }]}
              >
                <InputNumber
                  formatter={(value: string | undefined) =>
                    value ? `${value}` : ``
                  }
                  parser={(value: string | undefined) =>
                    value ? value.replace(" ", "") : ""
                  }
                  className="fullWidth"
                />
              </Form.Item>
            )}

            <Form.Item>
              <Row>
                <Col span={4}>
                  <Button type="primary" htmlType="submit" onClick={onSubmit}>
                    Submit
                  </Button>
                </Col>
                <Col span={4}>
                  <Button htmlType="button" onClick={onReset}>
                    Reset
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </>
        )}
      </Form>
    </section>
  );
}

export default AppRegister;
