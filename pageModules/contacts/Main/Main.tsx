import styles from './Main.module.scss';
import React, { FC, useState } from 'react'
import { Row, Col } from 'antd';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Text from '@/components/Text/Text';
import apiSlice, { useSetFeedbackQuery } from '@/store/slices/apiSlice';
import notify from '@/helpers/notify';

const Main:FC<any> = () => {
  const [setFeedback] = apiSlice.endpoints.setFeedback.useLazyQuery()
  const [email, setEmail] = useState('')
  const [feedback_text, setfeedback_text] = useState('')
  const [load, setLoad] = useState(false)

  const onSubmit = () => {
    if(email && feedback_text) {
      setLoad(true)
      setFeedback({email, feedback_text}).then((res:any) => {
        if(!res?.isError && res?.isSuccess && res?.data?.id) {
          notify('Success', "SUCCESS")
          setEmail('')
          setfeedback_text('')
        } else {
          notify('Error', 'ERROR')
        }
      }).finally(() => setLoad(false))
    }
  }


  return (
    <div className={styles.wrapper}>
      <p>
      If you have questions or suggestions on how to improve the HandmadeP experience, or if you&quot;ve discovered an error or bug on the website, please let us know through our contact form below.
      </p>
      <div className={styles.form}>
        <Row gutter={[10,10]}>
          <Col span={24}>
            <Input
              placeholder='E-mail'
              value={email}
              type='email'
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
          </Col>
          <Col span={24}>
            <Text
              placeholder='Text...'
              style={{height: 200}}
              value={feedback_text}
              onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => setfeedback_text(e.target.value)}
              />
          </Col>
          <Col span={24}>
            <Button
              text='Send'
              onClick={onSubmit}
              load={load}
              disabled={!(email && feedback_text)}
              />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Main;