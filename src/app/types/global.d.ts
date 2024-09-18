declare global {
    
    type FieldType = "text" | "textarea" | "password" | "email" | "checkbox"

    interface FormField  {
        name: string,
        type: FieldType,
        value: string | boolean | undefined,
        placeholder: string,
        [key: string]: string |boolean | undefined
    }
     interface PassWordField extends FormField {
        eyeVisibility: boolean,
     }
    
     type FiledList = Array<FormField | PassWordField>

     interface DropDownList {
        title: string,
        value: string | number,
        description?: string,
        [key: string]: string | number
     }

  }
  

  export {};