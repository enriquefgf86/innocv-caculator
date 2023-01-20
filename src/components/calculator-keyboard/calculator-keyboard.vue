<template >

    <CalculatorInput />
    
            <CalculatorNumbers />
      

</template>
<script lang='ts'>

import { calculatorStore } from '@/stores/calculator-store';
import { mapActions, mapState } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
    name: "CalculatorKeyboard",
    data() { return {} },

    methods: {
        ...mapActions(calculatorStore, {})
    },

    computed: {
        ...mapState(calculatorStore, {})
    },

    watch: {}
})
</script>
<style>
.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

}
.encroach{
}
</style>