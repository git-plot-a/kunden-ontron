declare global {
    
    type FieldType = "text" | "textarea" | "password" | "email" | "checkbox"

    interface FormField  {
        name: string,
        type: FieldType,
        value: string | boolean | undefined,
        placeholder: string
    }
     interface PassWordField extends FormField {
        eyeVisibility: boolean,
     }
    
     type FiledList = Array<FormField | PassWordField>

  }
  
  export {};