

export interface inputTypes extends React.HTMLProps<HTMLInputElement> {
    error?: boolean,
    label?: string,
    nodeLabel?: React.ReactNode
    errorText?: string,
    hint?: boolean | React.ReactNode | string,
    mask?: string,
    getUnmaskedValue?: boolean,
    onChangeMask?: (...args: any[]) => void
}