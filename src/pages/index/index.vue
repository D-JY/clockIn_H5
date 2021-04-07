<template>
    <div class="box">
        <data-form :config="config" @getVal="getVal" ref="dataForm"></data-form>
        <van-button type="info" round class="btn" @click="send">发送</van-button>
    </div>
</template>

<script>
import dataForm from '@/components/dataForm'
import { Button, Toast } from 'vant'
import { userList, sendWeiXinMsg } from '../../services/weixin'

export default {
    components: {
        dataForm,
        [Button.name]: Button
    },
    data() {
        return {
            config: [
                {
                    key: 'id',
                    type: 'select',
                    label: '接收人',
                    options: [],
                    rules: [{ required: true, message: '请选择信息接收人' }]
                },
                {
                    key: 'notice',
                    type: 'textarea',
                    label: '通知信息',
                    row: 6,
                    placeholder: '请填写通知内容',
                    maxlength: 100,
                    rules: [{ required: true, message: '请填写通知内容' }]
                }
            ],
            allData: {}
        }
    },
    mounted() {
        this.getUserList()
    },
    methods: {
        getVal(val) {
            this.allData = val
        },
        send() {
            this.$refs.dataForm.$refs.form.validate().then(() => {
                sendWeiXinMsg(this.allData).then(data => {
                    Toast(data.message)
                })
            })
        },
        getUserList() {
            userList().then(data => {
                if (data.success) {
                    const userList = data.data.map(val => {
                        val.text = val.name
                        val.value = val.id
                        return val
                    })
                    this.$set(this.config[0], 'options', userList)
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.box{
    height: 100%;
    background: #eee;
    padding: 20px 10px;
    box-sizing: border-box;
}
.btn{
    width: 90%;
    margin: 20px auto;
    display: block;
}  
</style>
