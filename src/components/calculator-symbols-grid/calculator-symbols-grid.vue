<template >
    <div>
        <div class="container">
            <div class="grid-symbols-buttons-container">
                <button @click="numberPadClick($event)" v-for="(symbol, indexSymbol) in symbols" :key="indexSymbol"
                    :class="symbol.class">{{
    symbol.value
                    }}</button>
            </div>
        </div>
    </div>

    <div>
    </div>

</template>
<script lang='ts'>

import { calculatorStore } from '@/stores/calculator-store';
import { mapActions, mapState } from 'pinia';
import { defineComponent } from 'vue';
import type { CalculatorSymbols } from '../interfaces/interfaces';

 const OperatorsEnum= {
    dot : ".",
    div : "÷",
    mult : "x",
    plus : "+",
    rest : "-",
    equals : "=",
} as const ;

export default defineComponent({
    name: 'CalculatorSymbols',
    data() {
        return {
            symbols: <CalculatorSymbols>{
                div: { value: OperatorsEnum.div, class: "grid-button grid-symbols grid-symbols-buttons-container" },
                mult: { value: OperatorsEnum.mult, class: "grid-button grid-symbols grid-symbols-buttons-container" },
                plus: { value: OperatorsEnum.plus, class: "grid-button grid-symbols grid-symbols-buttons-container" },
                rest: { value: OperatorsEnum.rest, class: "grid-button grid-symbols grid-symbols-buttons-container" },
                dot: { value: OperatorsEnum.dot, class: "grid-button grid-symbols grid-symbols-buttons-container" },
                equals: { value: OperatorsEnum.equals, class: "grid-2-span grid-symbols grid-symbols-buttons-container" },
            }
        }
    },

    methods: {
        ...mapActions(calculatorStore, {}),

        numberPadClick(event: MouseEvent): void {
            console.log((event.target as HTMLElement).innerHTML);


        }
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