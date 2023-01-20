<template >
    <div class="calculator-body">
        <CalculatorKeyboard />
    </div>
</template>
<script>

import { defineComponent } from 'vue'

export default defineComponent({
    name: "Calculator",
    data() {
        return {}
    }
}) 
</script>
<style lang="scss">
@import '../styles/main-styles.scss';
</style>