export interface CalculatorStore { };

export interface CalculatorActions {
    del: { value: string, class: string },
    ac: { value: string, class: string },
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



export const OperatorsEnum= {
    dot : ".",
    div : "÷",
    mult : "x",
    plus : "+",
    rest : "-",
    equals : "=",
} as const ;
export type OperatorsEnum = typeof OperatorsEnum[keyof typeof OperatorsEnum]

  

