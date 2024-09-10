declare global {
    
    type FieldType = "text" | "textarea" | "password" | "email"

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

     type loginFiledValues = {
        username: string,
        password: string,
        [key: string]: string | boolean | undefined
    }
  }
  
  export {};