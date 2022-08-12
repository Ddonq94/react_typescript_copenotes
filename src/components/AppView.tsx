import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Empty, Row, Tooltip } from "antd";
import { useEffect } from "react";
import { Icomponent, ISentMessage, IUser } from "../types/types";
import useUsers from "../hooks/useUsers";

function AppView({ testID = "AppView" }: Icomponent) {
  const { users, refresh, loading } = useUsers();

  useEffect(() => {
    const AUTO_REFRESH_INTERVAL = 60000;
    const interval = setInterval(async () => {
      refresh();
    }, AUTO_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [users]);

  return (
    <section data-testid={testID} className="AppView">
      <div className="AppViewHead">
        <h3>See Users Below</h3>
        <Tooltip title="prompt text">
          <Button
            type="primary"
            shape="circle"
            onClick={() => {
              refresh();
            }}
            icon={loading ? <LoadingOutlined /> : <ReloadOutlined />}
          />
        </Tooltip>
      </div>
      <Row gutter={[32, 32]}>
        {users?.map(({ email, name, sentMessages }: IUser) => {
          return (
            <Col span={8}>
              <Card title={`${name} (${email})`}>
                {sentMessages && sentMessages?.length > 0 ? (
                  <ol>
                    {sentMessages?.map(({ message }: ISentMessage) => {
                      return <li>{message}</li>;
                    })}
                  </ol>
                ) : (
                  <Empty />
                )}
              </Card>
            </Col>
          );
        })}
      </Row>
    </section>
  );
}

export default AppView;
