<template >
    <div class="calculator-display-container">
        <input readonly class="grid-calculator-display-former-value" type="number" :value="getInputFormerValue">
        <input readonly type="text" class="operator-slot-input" :value="getOperatorForAction">
        <input readonly type="number" class=" grid-calculator-display-current-value" :value="getInputCurrentValue">
    </div>

    <div class="innocv-log">
        INNOCV-TEST
    </div>
</template>

<script lang="ts">
import { calculatorStore, OperatorsEnum } from '@/stores/calculator-store';
import {  mapState } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
    name: "CalculatorInput",
    data() {
        return {
            operators: OperatorsEnum,
            limit: <number>99999999999
        }
    },

    methods: {
        getExponentialResult(value: number): number {

            if (value > this.limit) {
                Number(value.toPrecision(7))
            }
            return Number(value.toFixed(2))
        }
    },
    computed: {
        ...mapState(calculatorStore, ['getCurrentValueInput', 'getFormervalueInput', 'getOperatorInAction']),

        getInputCurrentValue(): number {
            let currentValue = +(this.getCurrentValueInput[0] === 0 ? this.getCurrentValueInput.splice(0, 1).join('') : this.getCurrentValueInput.join(''));

            return this.getExponentialResult(currentValue);
        },

        getInputFormerValue(): number {
            let formerValue = +this.getFormervalueInput.join('');

            return this.getExponentialResult(formerValue);
        },

        getOperatorForAction(): string {
            let operatorInAction = this.getOperatorInAction;

            return operatorInAction === "=" ? "" : operatorInAction
        },
    },
}) 
</script>
<style lang="scss">
</style>


