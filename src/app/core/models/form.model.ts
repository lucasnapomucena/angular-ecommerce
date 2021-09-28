export interface FormField {
  label: string;
  name: string;
  type: string;
  inputType: string;
  required?: boolean;
  validator?: string;
  value: Value[];
}

export interface Value {
  name: string;
}
