import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../components/InputForm/InputForm'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperCardTitle, CardTitleMain, CardSubtitle } from './style'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide'

const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')
    

    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            UserService.updateUser(id, rests, access_token)
        }
    )

    

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { data, isLoading, isSuccess, isError } = mutation

    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    }, [user])

    useEffect(() => {
        if (isSuccess) {
            message.success()
            handleGetDetailsUser(user?.id, user?.access_token)
        } else if (isError) {
            message.error()
        }
    }, [isSuccess, isError])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangeName = (value) => {
        setName(value)
    }
    const handleOnchangePhone = (value) => {
        setPhone(value)
    }
    const handleOnchangeAddress = (value) => {
        setAddress(value)
    }

    const handleUpdate = () => {
        const phoneReg = /^[0-9]{10}$/
        if (!phone) {
            message.error('Vui lòng nhập số điện thoại!')
            return
        }
        if (!phoneReg.test(phone)) {
            message.error('Số điện thoại phải chứa đúng 10 chữ số!')
            return
        }
        // submit all fields at once; keep payload shape consistent (no avatar here)
        mutation.mutate({ id: user?.id, email, name, phone, address, access_token: user?.access_token })
    }

    

    return (
        <div style={{ width: '100%', maxWidth: 1100, margin: '0 auto' }}>

            <Loading isLoading={isLoading}>
                <WrapperContentProfile>
                    <WrapperCardTitle>
                        <CardTitleMain>Thông tin người dùng</CardTitleMain>
                        <CardSubtitle>Cập nhật thông tin cá nhân của bạn</CardSubtitle>
                    </WrapperCardTitle>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <WrapperLabel htmlFor="name">Họ và tên</WrapperLabel>
                            <InputForm style={{ width: '100%', minWidth: 320 }} id="name" value={name} onChange={handleOnchangeName} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <WrapperLabel htmlFor="email">Email</WrapperLabel>
                            <InputForm style={{ width: '100%', minWidth: 320 }} id="email" value={email} onChange={handleOnchangeEmail} />
                        </div>

                        <div style={{ display: 'fixed', flexDirection: 'column', gap: 8 }}>
                            <WrapperLabel htmlFor="phone">Số điện thoại</WrapperLabel>
                            <InputForm style={{ width: '100%', minWidth: 320 }} id="phone" value={phone} onChange={handleOnchangePhone} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <WrapperLabel htmlFor="address">Địa chỉ</WrapperLabel>
                            <InputForm style={{ width: '100%', minWidth: 320 }} id="address" value={address} onChange={handleOnchangeAddress} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={48}
                            styleButton={{
                                height: '44px',
                                minWidth: '180px',
                                borderRadius: '8px',
                                padding: '0 18px'
                            }}
                            textbutton={'Cập nhật thông tin'}
                            styleTextButton={{ color: '#505050', fontSize: '15px', fontWeight: '700' }}
                        />
                    </div>

                    
                </WrapperContentProfile>
            </Loading>
        </div>
    )
}

export default ProfilePage