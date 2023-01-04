export enum InputType {
    Structure,
    Float,
    String,
}

export enum Operation {
    Equal,
    GreaterThan,
    LessThan,
    GreaterThanOrEqual,
    LessThanOrEqual,
}

export const operator_names: { [key in Operation] : string } = {
    [Operation.Equal]: 'equal',
    [Operation.GreaterThan]: 'greaterthan',
    [Operation.GreaterThanOrEqual]: 'greaterthanorequal',
    [Operation.LessThan]: 'lessthan',
    [Operation.LessThanOrEqual]: 'lessthanorequal',
}

export const operator_symbols: { [key in Operation] : string } = {
    [Operation.Equal]: '=',
    [Operation.GreaterThan]: '>',
    [Operation.GreaterThanOrEqual]: '>=',
    [Operation.LessThan]: '<',
    [Operation.LessThanOrEqual]: '<=',
}

export const symbol_operators = {
    '=': Operation.Equal,
    '>': Operation.GreaterThan,
    '>=': Operation.GreaterThanOrEqual,
    '<': Operation.LessThan,
    '<=': Operation.LessThanOrEqual,
}

export type SearchOption = {
    name: string,
    operators: Operation[],
    input: InputType,
    get_query: (selected_operator: Operation, input: any) => any,
}