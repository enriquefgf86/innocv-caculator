<template >
    <div>
        <div class="grid-number-buttons-container">
            <button @click="calculator(number.value)" :ref="number.dataType"
                v-for="(number, buttonIndex) in getCalculatorKeyBoard" :key="buttonIndex" :class="number.class">{{
    number.value
                }}</button>
        </div>
    </div>

</template>
<script lang='ts'>

import { calculatorStore, OperatorsEnum } from '@/stores/calculator-store';
import { mapActions, mapState } from 'pinia';
import { defineComponent } from 'vue';
import type { CalculatorPad } from '../interfaces/interfaces';

export default defineComponent({
    name: 'CalculatorNumbers',
    setup() {

        return {
            operations: {
                [OperatorsEnum.plus]: (formerValue: number, currentValue: number) => (formerValue as number) + (currentValue as number),
                [OperatorsEnum.div]: (formerValue: number, currentValue: number) => (formerValue as number) / (currentValue as number),
                [OperatorsEnum.rest]: (formerValue: number, currentValue: number) => (formerValue as number) - (currentValue as number),
                [OperatorsEnum.mult]: (formerValue: number, currentValue: number) => (formerValue as number) * (currentValue as number),
            }
        }
    },

    methods: {
        ...mapActions(calculatorStore, ['updateCurrentValueInput', 'setFormerValueInput', 'performArithmetic', 'setOperatorInAction', 'resetCalculator', 'resetOperator', 'resetCurrentValue']),
        calculator(value: number | string): void {
            //reset calculator
            if (this.isDeletionClicked(value)) {
                this.resetCalculator()
            }

            //reset current value for operation
            if (this.isACClicked(value)) {
                this.getCurrentVAlue !== 0 ? this.resetCurrentValue() : null,
                    this.getOperatorVAlue ? this.resetOperator() : null
            }


            //update current value while typing if is number
            if ((value == "." || typeof value == "number") || (this.getFormerVAlue && this.getOperatorVAlue && typeof value !== "number" && value !== ".")) {
                this.updateCurrentValueInput(value)
            }

            //setting operation in action if there is already a former value to
            //calculate with
            if (this.getFormerVAlue && this.isOperatorClicked(value)) {
                this.setOperatorInAction(<string>value)
            }

            //setting value to be included on operation
            if (((!this.getFormerVAlue || this.getFormerVAlue == 0) && this.getCurrentVAlue === 0) && this.isOperatorClicked(value)) {
                return
            }

            if (typeof value === "string" && value !== "." && this.getCurrentVAlue !== 0) {
                this.setFormerValueInput(value)
            }

            if (typeof value !== "number" && value != "." && this.getFormerVAlue && this.getCurrentVAlue && this.getOperatorVAlue) {
                this.getOperationResult()
            }

            if (this.getFormerVAlue && this.getOperatorVAlue && typeof value !== "number" && value !== ".") {
                this.getOperationResult()
            }




        },


        getOperationResult(): void {
            let result: number = 0;

            result = this.operations[this.getOperatorVAlue as keyof typeof this.operations](this.getFormerVAlue, this.getCurrentVAlue)
            this.performArithmetic(result)
        },

        isOperatorClicked(value: string | number): boolean {
            return (value === OperatorsEnum.div ||
                value === OperatorsEnum.mult ||
                value === OperatorsEnum.rest ||
                value === OperatorsEnum.plus)
        },

        isDeletionClicked(value: string | number): boolean {
            return value === OperatorsEnum.delete
        },

        isACClicked(value: string | number): boolean {
            return value === OperatorsEnum.ac
        },





    },

    computed: {
        ...mapState(calculatorStore, ['getCurrentValueInput', 'getFormervalueInput', 'getOperatorInAction']),

        getCalculatorKeyBoard(): CalculatorPad[] {
            let indexes = [
                { value: "M+", class: " grid-button grid-memory ", dataType: "memory-add" },
                { value: "M-", class: " grid-button grid-memory  ", dataType: "memory-extract" },
                { value: "AC", class: " grid-button grid-actions  ", dataType: "delete-all" },
                { value: "DEL", class: "grid-1-span grid-button grid-actions grid-column-invade ", dataType: "delete-current" },

                { value: 1, class: "grid-button grid-numbers  ", dataType: "number" },
                { value: 2, class: "grid-button grid-numbers  ", dataType: "number" },
                { value: 3, class: "grid-button grid-numbers  ", dataType: "number" },
                { value: "x", class: "grid-button grid-symbols  ", dataType: "operator" },

                { value: 4, class: "grid-button grid-numbers  ", dataType: "number" },
                { value: 5, class: "grid-button grid-numbers  ", dataType: "number" },
                { value: 6, class: "grid-button grid-numbers  ", dataType: "number" },
                { value: "-", class: "grid-button grid-symbols  ", dataType: "operator" },

                { value: 7, class: "grid-button grid-numbers  ", dataType: "number" },
                { value: 8, class: "grid-button grid-numbers  ", dataType: "number" },
                { value: 9, class: "grid-button grid-numbers  ", dataType: "number" },
                { value: "÷", class: "grid-button grid-symbols  ", dataType: "operator" },

                { value: 0, class: "grid-button grid-numbers  ", dataType: "number" },
                { value: ".", class: "grid-button grid-symbols  ", dataType: "operator" },

                { value: "=", class: "grid-button grid-symbols  ", dataType: "operator" },
                { value: "+", class: "grid-button grid-symbols  ", dataType: "operator" },




            ]



            return indexes
        },

        getCurrentVAlue(): number {
            return Number(this.getCurrentValueInput.join(''))
        }
        ,

        getFormerVAlue(): number {
            const value = this.getFormervalueInput.join('');

            return +value
        },

        getOperatorVAlue(): string {
            return (this.getOperatorInAction)
        }
    },
    created() {
        this.getCalculatorKeyBoard
    },

    watch: {}
})
</script>
<style>

</style>