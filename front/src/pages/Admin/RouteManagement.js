import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Tag, Col, Row, Input, Space, message, Select } from 'antd'
import axios from 'axios'
import { PlusOutlined, OrderedListOutlined, MinusCircleOutlined } from '@ant-design/icons'

const { Option } = Select

const RouteManagement = () => {
  const [routes, setRoutes] = useState([])
  const [stations, setStations] = useState([]) // 用于获取所有车站信息
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingRoute, setEditingRoute] = useState(null)

  // 模拟获取 token
  const token = localStorage.getItem('token')

  // 获取所有车站
  useEffect(() => {
    axios
      .get('/station', {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.data.code === 200) {
          setStations(response.data.data)
        }
      })
      .catch((error) => {
        console.error('Error fetching stations:', error)
      })
  }, [])

  // 获取所有线路
  useEffect(() => {
    axios
      .get('/route', {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.data.code === 200) {
          setRoutes(response.data.data)
        }
      })
      .catch((error) => {
        console.error('Error fetching routes:', error)
      })
  }, [])

  const showModal = (route) => {
    setEditingRoute(route)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setEditingRoute(null)
  }

  const handleSave = (values) => {
    // 获取所有车站的名称和距离
    let stations = values.stations
    const stationDistances = values.stationDistances || []

    // 去重车站，使用 Set 去重
    stations = [...new Set(stations)]

    // 将 stationDistances 中的距离转换为 float 类型，并创建 distance_from_start 数组
    const distanceFromStart = stationDistances.map((station) => parseFloat(station.distance))

    // 确保 price_pk 是 float 类型
    const pricePk = parseFloat(values.price_pk)

    const requestData = {
      name: values.name,
      stations: stations, // 去重后的车站名称数组
      price_pk: pricePk, // 转换后的单价
      distance_from_start: distanceFromStart, // 转换后的每个车站的距离
    }

    if (editingRoute) {
      // 编辑路线
      setRoutes(
        routes.map((route) =>
          route.id === editingRoute.id ? { ...route, ...requestData } : route,
        ),
      )
      message.success('Route updated successfully')
    } else {
      // 添加新路线
      axios
        .post('/admin/route', requestData, {
          headers: { Authorization: token },
        })
        .then(() => {
          setRoutes([...routes, { id: Date.now(), ...requestData }])
          message.success('Route added successfully')
        })
        .catch((error) => {
          message.error('Error adding route')
        })
    }
    setIsModalVisible(false)
    setEditingRoute(null)
  }

  const handleDelete = (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条路线吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        setRoutes(routes.filter((route) => route.id !== id))
        message.success('Route deleted successfully')
      },
    })
  }

  const columns = [
    {
      title: '路线名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '经过车站',
      dataIndex: 'stations',
      key: 'stations',
      render: (stations) => stations.join(' -> '),
    },
    {
      title: '单价 (元/km)',
      dataIndex: 'price_pk',
      key: 'price_pk',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showModal(record)}>
            编辑
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div className="route-management">
      <div className="route-management-header">
        <h2>
          <OrderedListOutlined /> 线路管理
        </h2>
        <Button type="primary" onClick={() => showModal(null)}>
          <PlusOutlined /> 添加路线
        </Button>
      </div>

      <Table
        dataSource={routes}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showTotal: (total) => `共 ${total} 条数据`,
        }}
      />

      <Modal
        title={editingRoute ? '编辑路线' : '添加路线'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <Form
          initialValues={editingRoute ? { ...editingRoute } : {}}
          onFinish={handleSave}
          layout="vertical"
        >
          <Form.Item
            label="路线名称"
            name="name"
            rules={[{ required: true, message: '请输入路线名称' }]}
          >
            <Input placeholder="请输入路线名称" />
          </Form.Item>

          <Form.Item
            label="经过车站"
            name="stations"
            rules={[{ required: true, message: '请选择经过的车站' }]}
          >
            <Select
              mode="multiple"
              placeholder="选择经过的车站"
              options={stations.map((station) => ({ label: station.name, value: station.name }))}
            />
          </Form.Item>

          <Form.Item
            label="每公里单价 (元)"
            name="price_pk"
            rules={[{ required: true, message: '请输入每公里单价' }]}
          >
            <Input type="number" placeholder="请输入每公里单价" />
          </Form.Item>

          <Form.List
            name="stationDistances"
            initialValue={editingRoute ? editingRoute.stationDistances : []}
            rules={[
              {
                validator: async (_, names) => {
                  if (!names || names.length < 1) {
                    return Promise.reject(new Error('请至少输入一个车站的距离'))
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Row key={key} gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[name, 'station']}
                        fieldKey={[fieldKey, 'station']}
                        label="车站"
                        rules={[{ required: true, message: '请选择车站' }]}
                      >
                        <Select
                          placeholder="选择车站"
                          options={stations.map((station) => ({
                            label: station.name,
                            value: station.name,
                          }))}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[name, 'distance']}
                        fieldKey={[fieldKey, 'distance']}
                        label="到起点站距离 (km)"
                        rules={[{ required: true, message: '请输入距离' }]}
                      >
                        <Input type="number" placeholder="请输入距离" />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Button
                        type="dashed"
                        onClick={() => remove(name)}
                        icon={<MinusCircleOutlined />}
                      >
                        删除车站
                      </Button>
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                    添加车站
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button onClick={handleCancel}>取消</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default RouteManagement

