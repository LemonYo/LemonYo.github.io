import React from 'react'
import './index.scss'
import QueueAnim from 'rc-queue-anim';

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      num: 1
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="index-page">
        <div className="page-one page">
          <QueueAnim className="container text-center" type="bottom">
            <div className="avatar" key="demo1"></div>
            <div className="name" key="demo2"><strong>LemonYo</strong></div>
            <div className="desc" key="demo3">
              前端菜鸟一枚，喜欢唱、跳、rap、篮球
            </div>
          </QueueAnim>
        </div>
      </div>
    )
  }
}

export default Index