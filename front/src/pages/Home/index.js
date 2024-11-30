import './index.css'
import { Tabs } from 'antd'

const onChange = (key) => {
  console.log(key)
}
const items = [
  {
    key: '1',
    label: 'Tab 1',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Tab 2',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Tab 3',
    children: 'Content of Tab Pane 3',
  },
]

export default function Home() {
  return (
    <div className="container2">
      <div className="container2-box">
        <div className="searchTitle">Search trains</div>
        <div className="searchTab">
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </div>
    </div>
  )
}

