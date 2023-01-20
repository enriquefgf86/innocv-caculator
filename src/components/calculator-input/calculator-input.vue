<template >
    <div class="calculator-display-container">
        <div class="calculator-input grid-calculator-display-former-value" >
            <div>{{ getFormerValueInpuGett }}</div>
            <div>{{ getOperatorForAction!== operators.equals ? getOperatorForAction : "" }}</div>
        </div>

        <div class="calculator-input grid-calculator-display-current-value">
            <div>{{ getCurrentValueInpuGett }}</div>
        </div>
    </div>
    <div class="brand">
        INNOCV-TEST
    </div>
</template>
<script lang="ts">
import { calculatorStore, OperatorsEnum } from '@/stores/calculator-store';
import { mapActions, mapState } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
    name: "CalculatorInput",
    data() {
        return {
            operators: OperatorsEnum
        }
    },

    methods: {
        ...mapActions(calculatorStore, {})
    },
    computed: {
        ...mapState(calculatorStore, ['getCurrentValueInput', 'getFormervalueInput']),

        getCurrentValueInpuGett(): string {
            let currentValue = this.getCurrentValueInput[0] === 0 ? this.getCurrentValueInput.splice(0, 1).join('') : this.getCurrentValueInput.join('');

            return (currentValue)
        },

        getFormerValueInpuGett(): string {
            let formerValue = this.getFormervalueInput.join('');

            return formerValue
        },

        getOperatorForAction(): string {
            let operatorInAction = calculatorStore().getOperatorInAction;

            return operatorInAction
        },



    },
    watch: {},
    created() {
    }

}) 
</script>
<style lang="scss">

</style>


vue