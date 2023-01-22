export interface CalculatorStore {
    currentInputValue: (string | number)[],
    formerInputValue: (string | number)[],
    operatorOnAction: string,
    valueInMemory: number,
    mathError: string
};



export interface CalculatorNumbers {
    [key: string]: {
        value: number;
        class: string;
        dataType: string
    }
};


export interface CalculatorPad {
    value: string | number;
    class: string;
    dataType: string
};

export interface CalculatorSymbols {
    div: { value: string, class: string },
    mult: { value: string, class: string },
    plus: { value: string, class: string },
    rest: { value: string, class: string },
    dot: { value: string, class: string },
    equals: { value: string, class: string },
};






