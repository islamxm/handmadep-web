import styles from './ProfileEdit.module.scss';
import IUser from '@/models/IUser';
import {FC} from 'react';
import {Row, Col} from 'antd';
import Input from '@/components/Input/Input';
import Text from '@/components/Text/Text';
import {useState, useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import ApiService from '@/service/apiService';
import Button from '@/components/Button/Button';
import { updateUserData } from '@/store/actions';
import notify from '@/helpers/notify';

const service = new ApiService()

const ProfileEdit:FC<IUser> = ({
    username,
    email
}) => {
    const dispatch = useAppDispatch()
    const {token: {access}} = useAppSelector(s => s)
    const [load, setLoad] = useState(false)
    const [localUsername, setLocalUsername] = useState('')
    const [localEmail, setLocalEmail] = useState('')
    

    useEffect(() => {
        if(username) {
            setLocalUsername(username)
        }
        if(email) {
            setLocalEmail(email)
        }
    }, [username, email])


    const onSubmit = () => {
        if(localEmail && localUsername && access) {
            setLoad(true)
            service.editSelf({
                username: localUsername,
                email: localEmail
            }, access).then(res => {
                if(res?.id) {
                    dispatch(updateUserData(res))
                    notify('Success', 'SUCCESS')
                } else {
                    notify('Error', 'ERROR')
                }
            }).finally(() => {
                setLoad(false)
            })
        }
    }


    return (
        <div className={`${styles.wrapper} panel`}>
            <Row gutter={[20,20]}>
                <Col span={24}>
                    <Input
                        value={localUsername}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalUsername(e.target.value)}
                        placeholder='Username'
                        />
                </Col>
                <Col span={24}>
                    <Input
                        value={localEmail}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setLocalEmail(e.target.value)}
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
                {/* <Col span={24}>
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
                </Col> */}
                <Col span={24}>
                    <div className={styles.action}>
                        <Button
                            onClick={onSubmit}
                            load={load}
                            disabled={!(localEmail && localUsername)}
                            text='Save'
                            />
                    </div>
                </Col>
            </Row>
        </div>
    )

}

export default ProfileEdit;