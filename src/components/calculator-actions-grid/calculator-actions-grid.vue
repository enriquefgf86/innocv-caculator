<template >
    
            <div class="grid-actions-buttons-container" >
                <button v-for="(item, value) in actions" :key="value" :class="item.class">{{ item.value }}</button>
            </div>
      

    <div>
    </div>

</template>
<script lang='ts'>

import { calculatorStore } from '@/stores/calculator-store';
import { mapActions, mapState } from 'pinia';
import { defineComponent } from 'vue';
import type { CalculatorActions } from '../interfaces/interfaces';

export default defineComponent({
    name: "CalculatorActions",
    data() {
        return {
            actions: <CalculatorActions>{
                ac: {value:"AC",class:"grid-1-span grid-button grid-actions "},
                del:{value:"DEL",class:"grid-2-span grid-button grid-actions "} 
            }
        }
    },

    methods: {
        ...mapActions(calculatorStore, {})
    },

    computed: {
        ...mapState(calculatorStore, {})
    },

    watch: {}
})
</script>
<style lang="scss">
@import '../../styles/main-styles.scss';

</style>