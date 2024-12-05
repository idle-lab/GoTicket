import React from 'react';
import { Collapse, Card, Typography, Divider } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const { Title, Paragraph, Text } = Typography;

const Helps = () => {
  const helpSections = [
    {
      key: '1',
      title: '购票相关',
      items: [
        {
          question: '如何购买火车票？',
          answer: (
            <>
              <Paragraph>
                1. 登录账号后，在首页选择出发地、目的地和出行日期
              </Paragraph>
              <Paragraph>
                2. 点击"查询"按钮，查看符合条件的车次
              </Paragraph>
              <Paragraph>
                3. 选择合适的车次和座位类型，点击"预订"
              </Paragraph>
              <Paragraph>
                4. 填写乘车人信息（请确保已在个人中心添加乘车人）
              </Paragraph>
              <Paragraph>
                5. 确认订单信息并支付
              </Paragraph>
            </>
          ),
        },
        {
          question: '可以提前多久购票？',
          answer: '通常可以提前30天购票。节假日期间可能会有特殊安排，请关注官方公告。',
        },
        {
          question: '支持哪些支付方式？',
          answer: '目前支持支付宝、微信支付、银行卡等多种支付方式。',
        },
      ],
    },
    {
      key: '2',
      title: '退改签说明',
      items: [
        {
          question: '如何退票？',
          answer: (
            <>
              <Paragraph>
                1. 在"订单管理"中找到需要退票的订单
              </Paragraph>
              <Paragraph>
                2. 点击"退票"按钮，确认退票信息
              </Paragraph>
              <Paragraph>
                3. 按照提示完成退票操作
              </Paragraph>
              <Text type="warning">
                注意：退票会收取一定手续费，具体费用根据距离发车时间长短而定
              </Text>
            </>
          ),
        },
        {
          question: '如何改签？',
          answer: (
            <>
              <Paragraph>
                1. 在"订单管理"中找到需要改签的订单
              </Paragraph>
              <Paragraph>
                2. 点击"改签"按钮，选择新的车次
              </Paragraph>
              <Paragraph>
                3. 支付差价或接收退款
              </Paragraph>
              <Text type="warning">
                注意：改签只能改签至同日期或之后的车次
              </Text>
            </>
          ),
        },
      ],
    },
    {
      key: '3',
      title: '账户安全',
      items: [
        {
          question: '如何修改密码？',
          answer: '进入"个人中心-设置"，选择"修改密码"，输入原密码和新密码即可完成修改。',
        },
        {
          question: '忘记密码怎么办？',
          answer: '点击登录页面的"忘记密码"，通过绑定的手机号或邮箱进行身份验证后重置密码。',
        },
      ],
    },
    {
      key: '4',
      title: '常见问题',
      items: [
        {
          question: '为什么无法购票？',
          answer: (
            <>
              <Paragraph>可能的原因：</Paragraph>
              <Paragraph>1. 账户未实名认证</Paragraph>
              <Paragraph>2. 未添加乘车人信息</Paragraph>
              <Paragraph>3. 车票已售罄</Paragraph>
              <Paragraph>4. 网络连接问题</Paragraph>
            </>
          ),
        },
        {
          question: '如何添加常用乘车人？',
          answer: '进入"个人中心-乘车人管理"，点击"添加乘车人"，填写乘车人信息即可。',
        },
      ],
    },
  ];

  return (
    <div className="helps-container" style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>
          <QuestionCircleOutlined /> 帮助中心
        </Title>
        <Paragraph type="secondary">
          欢迎查看帮助中心，这里为您提供常见问题解答和使用指南。如果没有找到您需要的答案，请联系客服。
        </Paragraph>
        <Divider />
        
        <Collapse defaultActiveKey={['1']} expandIconPosition="right">
          {helpSections.map(section => (
            <Panel header={<Title level={4}>{section.title}</Title>} key={section.key}>
              <Collapse ghost>
                {section.items.map((item, index) => (
                  <Panel 
                    header={<Text strong>{item.question}</Text>} 
                    key={`${section.key}-${index}`}
                  >
                    <div style={{ padding: '0 24px' }}>
                      {item.answer}
                    </div>
                  </Panel>
                ))}
              </Collapse>
            </Panel>
          ))}
        </Collapse>

        <Divider />
        
        <Card type="inner" title="联系客服">
          <Paragraph>
            如果您还有其他问题，可以通过以下方式联系我们：
          </Paragraph>
          <Paragraph>
            <Text strong>客服热线：</Text> 400-123-4567（工作时间：9:00-18:00）
          </Paragraph>
          <Paragraph>
            <Text strong>客服邮箱：</Text> support@trainticket.com
          </Paragraph>
          <Paragraph>
            <Text strong>在线客服：</Text> 点击网站右下角的客服图标即可开始在线咨询
          </Paragraph>
        </Card>
      </Card>
    </div>
  );
};

export default Helps;
