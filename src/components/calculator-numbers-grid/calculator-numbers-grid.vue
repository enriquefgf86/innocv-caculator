<template>
    <div>
        <div class="grid-number-buttons-container">
            <button @click="calculator(number.value)" v-for="(number, buttonIndex) in getCalculatorKeyBoard"
                :key="buttonIndex" :data-type="number.dataType" :class="number.class">
                {{ number.value }}
            </button>
        </div>
    </div>
</template>

<script lang="ts">

import { calculatorStore, OperatorsEnum } from "@/stores/calculator-store";
import { mapActions, mapState } from "pinia";
import { defineComponent } from "vue";
import type { CalculatorPad } from "../interfaces/interfaces";

export default defineComponent({
    name: "CalculatorNumbers",
    setup() {
        return {
            operations: {
                [OperatorsEnum.plus]: (formerValue: number, currentValue: number) =>
                    (formerValue as number) + (currentValue as number),
                [OperatorsEnum.div]: (formerValue: number, currentValue: number) =>
                    (formerValue as number) / (currentValue as number),
                [OperatorsEnum.rest]: (formerValue: number, currentValue: number) =>
                    (formerValue as number) - (currentValue as number),
                [OperatorsEnum.mult]: (formerValue: number, currentValue: number) =>
                    (formerValue as number) * (currentValue as number),
            },
        };
    },

    methods: {
        ...mapActions(calculatorStore, [
            "updateCurrentValueFromMemory",
            "updateCurrentValueInput",
            "setCurrentValueToMemory",
            "setFormerValueInput",
            "getResultOfCalculation",
            "setOperatorInAction",
            "resetCalculator",
            "resetOperator",
            "resetCurrentValue",
        ]),

        calculator(value: number | string): void {
            //reset calculator
            if (this.isDeletionClicked(value)) {
                this.resetCalculator();
            }

            //reset current value for operation
            if (this.isACClicked(value)) {
                this.getCurrentVAlue !== 0 ? this.resetCurrentValue() : null,
                    this.getOperatorVAlue ? this.resetOperator() : null;
            }

            //update current value while typing if is number
            if (this.isTriggerUpdateCurrentValue(value)) {
                this.updateCurrentValueInput(value);
            }

            //setting operation in action if there is already a former value to
            //calculate with
            if (this.getFormerVAlue && this.isOperatorClicked(value)) {
                this.setOperatorInAction(<string>value);
            }

            //not triggering actions cause not values
            if (
                (!this.getFormerVAlue || this.getFormerVAlue == 0) && this.getCurrentVAlue === 0 &&
                this.isOperatorClicked(value)
            ) {
                return;
            }

            //not triggering actions cause not operator symbol
            if
                (this.getFormerVAlue && this.getCurrentVAlue && this.isOperatorClicked(value)
            ) {
                return;
            }

            //updating former value
            if (this.isUpdatedFormerValueWhenClickSymbol(value)) {
                this.setFormerValueInput(value as string);
            }

            //update current value from memory
            if (
                this.isMemoryRecoveryClicked(value) && this.getExistingValueInMemory
            ) {
                this.updateCurrentValueFromMemory();
            }

            //adding to memory
            if (this.isAddingtoMemoryClicked(value) && this.getCurrentVAlue !== 0) {
                this.setCurrentValueToMemory();
            }

            //getting calculation
            if (
                this.noMemoOrDotSymbolsAreClicked(value) && this.getFormerVAlue &&
                this.getCurrentVAlue && this.getOperatorVAlue
            ) {
                this.getOperationResult();
            }

            //not operation triggered
            if (this.getFormerVAlue && this.isClickedSymbolNotAutrizedInOp(value)) {
                return;
            }

            //trigger operation
            if (
                this.getFormerVAlue && this.getOperatorVAlue &&
                this.noMemoOrDotSymbolsAreClicked(value)
            ) {
                this.getOperationResult();
            }
        },

        async getOperationResult(): Promise<void> {
            let result: number = 0;

            result = await this.operations[
                this.getOperatorVAlue as keyof typeof this.operations
            ](this.getFormerVAlue, this.getCurrentVAlue);

            this.getResultOfCalculation(result);
        },

        //=======================ACTIONS OF CALCULATOR CHECKER==========================

        isOperatorClicked(value: string | number): boolean {
            return (
                value === OperatorsEnum.div ||
                value === OperatorsEnum.mult ||
                value === OperatorsEnum.rest ||
                value === OperatorsEnum.plus
            );
        },

        isDeletionClicked(value: string | number): boolean {
            return value === OperatorsEnum.delete;
        },

        isACClicked(value: string | number): boolean {
            return value === OperatorsEnum.ac;
        },

        isNotForMemoOrDot(value: string | number) {
            return (
                typeof value === "string" &&
                value !== OperatorsEnum.dot &&
                value !== OperatorsEnum.memoadd
            );
        },

        isTriggerUpdateCurrentValue(value: string | number): boolean {
            return value == OperatorsEnum.dot || typeof value == "number";
        },

        isUpdatedFormerValueWhenClickSymbol(value: string | number): boolean {
            return (
                typeof value === "string" &&
                value !== OperatorsEnum.dot &&
                value !== OperatorsEnum.memoless &&
                value !== OperatorsEnum.memoadd &&
                this.getCurrentVAlue !== 0
            );
        },

        isMemoryRecoveryClicked(value: string | number): boolean {
            return typeof value === "string" && value === OperatorsEnum.memoless;
        },

        isAddingtoMemoryClicked(value: string | number): boolean {
            return typeof value === "string" && value === OperatorsEnum.memoadd;
        },

        isClickedSymbolNotAutrizedInOp(value: string | number): boolean {
            return typeof value === "string" && value !== OperatorsEnum.dot;
        },

        noMemoOrDotSymbolsAreClicked(value: string | number): boolean {
            return (
                typeof value !== "number" &&
                value !== OperatorsEnum.dot &&
                value !== OperatorsEnum.memoadd &&
                value !== OperatorsEnum.memoless
            );
        },
    },

    computed: {
        ...mapState(calculatorStore, [
            "getCurrentValueInput",
            "getFormervalueInput",
            "getOperatorInAction",
            "getValueInMemory",
        ]),

        getCalculatorKeyBoard(): CalculatorPad[] {
            const indexes = [
                {
                    value: OperatorsEnum.memoadd,
                    class: " grid-button grid-memory ",
                    dataType: "memory-add",
                },
                {
                    value: OperatorsEnum.memoless,
                    class: " grid-button grid-memory  ",
                    dataType: "memory-extract",
                },
                {
                    value: "AC",
                    class: " grid-button grid-actions  ",
                    dataType: "delete-all",
                },
                {
                    value: "DEL",
                    class: "grid-button grid-actions grid-column-invade ",
                    dataType: "delete-current",
                },

                { value: 1, class: "grid-button grid-numbers  numbers-and-symbols", dataType: "number" },
                { value: 2, class: "grid-button grid-numbers  numbers-and-symbols", dataType: "number" },
                { value: 3, class: "grid-button grid-numbers  numbers-and-symbols", dataType: "number" },
                {
                    value: OperatorsEnum.mult,
                    class: "grid-button grid-symbols  ",
                    dataType: "operator",
                },

                { value: 4, class: "grid-button grid-numbers  numbers-and-symbols", dataType: "number" },
                { value: 5, class: "grid-button grid-numbers  numbers-and-symbols", dataType: "number" },
                { value: 6, class: "grid-button grid-numbers  numbers-and-symbols", dataType: "number" },
                {
                    value: OperatorsEnum.rest,
                    class: "grid-button grid-symbols  ",
                    dataType: "operator",
                },

                { value: 7, class: "grid-button grid-numbers  numbers-and-symbols", dataType: "number" },
                { value: 8, class: "grid-button grid-numbers  numbers-and-symbols", dataType: "number" },
                { value: 9, class: "grid-button grid-numbers  numbers-and-symbols", dataType: "number" },
                {
                    value: OperatorsEnum.div,
                    class: "grid-button grid-symbols  ",
                    dataType: "operator",
                },

                { value: 0, class: "grid-button grid-numbers  numbers-and-symbols", dataType: "number" },
                {
                    value: OperatorsEnum.dot,
                    class: "grid-button grid-symbols  ",
                    dataType: "operator",
                },

                {
                    value: OperatorsEnum.equals,
                    class: "grid-button grid-symbols equal-button ",
                    dataType: "operator",
                },
                {
                    value: OperatorsEnum.plus,
                    class: "grid-button grid-symbols plus-button ",
                    dataType: "operator",
                },
            ];
            return indexes;
        },

        getCurrentVAlue(): number {
            const value = this.getCurrentValueInput.join("");
            return +value;
        },

        getFormerVAlue(): number {
            const value = this.getFormervalueInput.join("");

            return +value;
        },

        getOperatorVAlue(): string {
            return this.getOperatorInAction;
        },

        getExistingValueInMemory(): number | null {
            return this.getValueInMemory === 0 ? null : this.getValueInMemory;
        },
    },
    created() {
        this.getCalculatorKeyBoard;
    },

});
</script>
