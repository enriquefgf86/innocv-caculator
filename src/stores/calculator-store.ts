import type { CalculatorStore } from "@/components/interfaces/interfaces";
import { defineStore } from "pinia";

export const OperatorsEnum = {
  dot: ".",
  div: "÷",
  mult: "x",
  plus: "+",
  rest: "-",
  equals: "=",
  delete: "DEL",
  ac: "AC",
  memoadd: "M+",
  memoless: "M-"
} as const;
export type OperatorsEnum = typeof OperatorsEnum[keyof typeof OperatorsEnum]

export const calculatorStore = defineStore("calculatorStore", {
  state: (): CalculatorStore => ({
    currentInputValue: [0.0] as (string | number)[],
    formerInputValue: [0.0] as (string | number)[],
    operatorOnAction: <string>"",
    valueInMemory: <number>0.0,
    mathError: <string>"Ma ERROR",

  }),

  getters: {
    getCurrentValueInput: (state): Array<number | string> => state.currentInputValue,
    getFormervalueInput: (state): Array<number | string> => state.formerInputValue,
    getOperatorInAction: (state): string => state.operatorOnAction,
    getValueInMemory: (state): number => state.valueInMemory,

  },

  actions: {
    updateCurrentValueInput(payload: number | string): void {
      this.currentInputValue.includes(".") && payload === "." ? '' :
        this.currentInputValue.push(payload)
    },

    async updateCurrentValueFromMemory(): Promise<void> {
      await this.currentInputValue.push(this.valueInMemory)
      this.valueInMemory = 0
    },

    async setFormerValueInput(value: string): Promise<void> {
      await this.updateFormerInput()
      await this.setOperatorInAction(value)
      this.resetCurrentValue()
    },

    async setCurrentValueToMemory(): Promise<void> {
      this.valueInMemory = await Number(this.currentInputValue.join(''));
      this.resetCurrentValue()
    },

    async setOperatorInAction(value: string): Promise<void> {
      this.operatorOnAction = await value
    },

    async getResultOfCalculation(payload: number): Promise<void> {
      this.formerInputValue = await [];

      await this.formerInputValue.push(payload)

      this.resetCurrentValue()
      this.resetOperator()

    },

    async updateFormerInput(): Promise<void> {
      this.formerInputValue = await this.currentInputValue
    },

    resetCurrentValue(): void {
      this.currentInputValue = [0.0];
    },

    resetOperator(): void {
      this.operatorOnAction = "";
    },

    resetCalculator(): void {
      this.$reset();
    },

    triggerError(): void {
      this.currentInputValue = [this.mathError]
      console.log(this.currentInputValue);
      console.log(this.formerInputValue);


      setTimeout(() => {
        this.clearError()
      }, 999);
    }
    ,

    clearError(): void {
      this.resetCurrentValue()
    }
  },
});
