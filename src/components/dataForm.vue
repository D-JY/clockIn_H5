<template>
    <div>
        <van-form>
            <template v-for="(item, key) in config">
                <van-field
                    v-if="item.type === 'input'"
                    :key="key"
                    v-model="item.value"
                    :label="item.label"
                    :placeholder="item.placeholder"
                    :rules="item.rules"
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
                />
                <van-picker
                    v-if="item.type === 'select'"
                    :key="key"
                    :title="item.title || '请选择'"
                    show-toolbar
                    :columns="item.options || []"
                    @confirm="ChangeEvnet"
                />
            </template>
        </van-form>
    </div>
</template>

<script>
import { Form, Picker } from 'vant'

export default {
    components: {
        [Form.name]: Form,
        [Picker.name]: Picker
    },
    props: {
        config: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
