<template>
    <section ref="msg" class="user-msg">
        <p>{{ msg }}</p>
    </section>
</template>
<script lang="ts">
import { eventBus } from '../services/event.bus.service'
export default {
    name: 'user-msg',
    data() {
        return {
            msg: ''
        }
    },
    mounted() {
        eventBus.on('show-msg', (msg: any) => {
            const el = this.$refs.msg as HTMLElement
            this.msg = msg;
            el.classList.add('show')
            setTimeout(() => el.classList.remove('show'), 2000)
        })
    }
}
</script>