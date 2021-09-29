export interface FormField {
  label: string;
  name: string;
  type: string;
  inputType: string;
  required?: boolean;
  validator?: string;
  country: Country[];
  value: Value[];
}

export interface Value {
  name: string;
}

interface Country {
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  numericCode: string;
  callingCode: string;
}
