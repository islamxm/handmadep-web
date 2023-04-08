

export interface textTypes extends React.HTMLProps<HTMLTextAreaElement> {
    error?: boolean | string,
    label?: string,
    nodeLabel?: React.ReactNode
    errorText?: string,
    hint?: boolean | React.ReactNode | string,
    mask?: string,
    getUnmaskedValue?: boolean,
    onChangeMask?: (...args: any[]) => void
}