<template >
    <div class="calculator-display-container">
        <input readonly class="grid-calculator-display-former-value" :value="getInputFormerValue">
        <input readonly type="text" class="operator-slot-input" :value="getOperatorForAction">
    </div>

    <div class="calculator-display-container display-with-memory">
        <input readonly type="string" class=" grid-calculator-display-current-value memory-slot"
            :value="getValueInMemory !== 0 ? '(+ memo)' : ''">
        <input :maxlength="limit" readonly type="number" class=" grid-calculator-display-current-value number-slot"
            :value="getInputCurrentValue">
    </div>
    <div class="innocv-log">
        INNOCV-TEST
    </div>
</template>

<script lang="ts">
import { calculatorStore, OperatorsEnum } from '@/stores/calculator-store';
import { mapState } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
    name: "CalculatorInput",
    data() {
        return {
            operators: OperatorsEnum,
            limit: 10
        }
    },

    methods: {
        getExponentialResult(value: number): number {
            return value.toString().length > this.limit ? Number(Number(value.toExponential()).toPrecision(3)) : value;
        }
    },
    computed: {
        ...mapState(calculatorStore, ['getValueInMemory', 'getCurrentValueInput', 'getFormervalueInput', 'getOperatorInAction']),

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

        getExistingValueInMemory(): number {
            return this.getValueInMemory
        }
    },
}) 
</script>
<style lang="scss">

</style>


