<template>
    <div>
        <van-form ref="form">
            <template v-for="(item, key) in config">
                <van-field
                    v-if="item.type === 'input'"
                    :key="key"
                    v-model="item.value"
                    :label="item.label"
                    :placeholder="item.placeholder"
                    :rules="item.rules"
                    @blur="getVal(item)"
                />
                <van-field
                    v-if="item.type === 'textarea'"
                    :key="key"
                    v-model="item.value"
                    :rows="item.row || 2"
                    autosize
                    :label="item.label"
                    type="textarea"
                    :maxlength="item.maxlength"
                    :placeholder="item.placeholder"
                    :show-word-limit="!!item.maxlength"
                    :rules="item.rules"
                    @blur="getVal(item)"
                />
                <template v-if="item.type === 'select'">
                    <van-field
                        :key="key"
                        readonly
                        v-model="item.value"
                        :label="item.label"
                        :placeholder="item.placeholder"
                        :rules="item.rules"
                        @click="popupEvent(item)"
                        @change="getVal"
                    />
                    <van-popup v-model="popupModel[item.key]" round position="bottom" :key="item.key">
                        <van-picker
                            :title="item.title || '请选择'"
                            show-toolbar
                            :columns="typeof item.options === 'function' ? 
                                item.options() : Array.isArray(item.options) ? item.options : []"
                            @confirm="(val) => ChangeEvnet(val, item)"
                            @cancel="popupModel[item.key] = false"
                        />
                    </van-popup>
                </template>
                
            </template>
        </van-form>
    </div>
</template>

<script>
import { Form, Picker, Popup, Field } from 'vant'

export default {
    components: {
        [Form.name]: Form,
        [Picker.name]: Picker,
        [Popup.name]: Popup,
        [Field.name]: Field
    },
    props: {
        config: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            popupModel: {},
            allData: {}
        }
    },
    created() {
        this.config.map(val => {
            if (typeof val.value === void 0) val.value = ''
            if (val.type === 'select' && val.model === void 0) val.model = false
            return val
        })
    },
    methods: {
        popupEvent(item) {
            this.$set(this.popupModel, item.key, true)
        },
        ChangeEvnet(val, item) {
            this.popupModel[item.key] = false
            item.value = val.text
            this.allData[item.key] = val.value
            this.$emit('getVal', this.allData)
        },
        getVal(item) {
            this.allData[item.key] = item.value
            this.$emit('getVal', this.allData)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
