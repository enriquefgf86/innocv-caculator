import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import calculatorKeyboard from "./components/calculator-keyboard/calculator-keyboard.vue";
import calculatorInput from "./components/calculator-input/calculator-input.vue";
import calculatorView from "./view/calculator.vue";
import calculatorNumbers from './components/calculator-numbers-grid/calculator-numbers-grid.vue';



import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.component("CalculatorKeyboard", calculatorKeyboard);
app.component("Calculator", calculatorView);
app.component("CalculatorInput", calculatorInput);
app.component('CalculatorNumbers', calculatorNumbers)

app.mount("#app");
