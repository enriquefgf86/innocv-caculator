import { defineStore } from "pinia";

export const OperatorsEnum = {
  dot: ".",
  div: "÷",
  mult: "x",
  plus: "+",
  rest: "-",
  equals: "=",
  delete: "DEL",
  ac: "AC"
} as const;
export type OperatorsEnum = typeof OperatorsEnum[keyof typeof OperatorsEnum]

export const calculatorStore = defineStore("calculatorStore", {
  state: () => ({
    currentInputValue: [0.0] as (string | number)[],
    formerInputValue: [0.0] as (string | number)[],
    operatorOnAction: <string>"",

  }),


  getters: {
    getCurrentValueInput: (state): Array<number | string> => state.currentInputValue,
    getFormervalueInput: (state): Array<number | string> => state.formerInputValue,
    getOperatorInAction: (state): string => state.operatorOnAction

  },
  actions: {
    updateCurrentValueInput(payload: number | string): void {
this.currentInputValue.includes(".")&&payload==="."?'':
      this.currentInputValue.push(payload)
    },

    async setFormerValueInput(value: string): Promise<void> {
      await this.updateFormerInput()
      await this.setOperatorInAction(value)
      this.resetCurrentValue()
    },

    async setOperatorInAction(value: string): Promise<void> {
      this.operatorOnAction = await value
    },

    async performArithmetic(payload: number): Promise<void> {
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
    }
  },
});
