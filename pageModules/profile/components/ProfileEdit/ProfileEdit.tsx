import styles from './ProfileEdit.module.scss';
import IUser from '@/models/IUser';
import {FC} from 'react';
import {Row, Col} from 'antd';
import Input from '@/components/Input/Input';
import Text from '@/components/Text/Text';

const ProfileEdit:FC<IUser> = ({

}) => {

    return (
        <div className={`${styles.wrapper} panel`}>
            <Row gutter={[20,20]}>
                <Col span={24}>
                    <Input
                        placeholder='Username'
                        />
                </Col>
                <Col span={24}>
                    <Input
                        placeholder='E-mail'
                        />
                </Col>
                <Col span={24}>
                    <Input
                        placeholder='Your site'
                        />
                </Col>
                <Col span={24}>
                    <Text
                        style={{height: 200}}
                        placeholder='About'
                        />
                </Col>
                <Col span={24}>
                    <Input
                        placeholder='New password'
                        type='password'
                        />
                </Col>
                <Col span={24}>
                    <Input
                        placeholder='Confirm password'
                        type='password'
                        />
                </Col>
            </Row>
        </div>
    )

}

export default ProfileEdit;