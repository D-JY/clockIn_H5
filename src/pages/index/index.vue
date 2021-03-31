<template>
    <div class="box">
        <data-form :config="config" @getVal="getVal" ref="dataForm"></data-form>
        <van-button type="info" round class="btn" @click="send">发送</van-button>
    </div>
</template>

<script>
import dataForm from '@/components/dataForm'
import { Button } from 'vant'
import { getQueryString, getCode } from '../../utils'
import { getOpenId } from '../../services/weixin'
export default {
    components: {
        dataForm,
        [Button.name]: Button
    },
    data() {
        return {
            config: [
                {
                    key: 'receiveName',
                    type: 'select',
                    label: '接收人',
                    options: [{ text: 'Mr.D', value: '5' }],
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
    beforeCreate() {
        const code = getQueryString('code')
        if (!code) {
            getCode()
            return
        } else {
            getOpenId({ code }).then(data => {
                console.log(data)
            })
        }
    },
    methods: {
        getVal(val) {
            this.allData = val
        },
        send() {
            this.$refs.dataForm.$refs.form.validate().then(() => {
                console.log(this.allData)
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
