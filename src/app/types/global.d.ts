declare global {
  type FieldType = "text" | "textarea" | "password" | "email" | "checkbox";

  interface jiraFields {
    summary: string;
    description: string;
    customfield_10244: string;
  }
  interface FormField {
    name: string;
    type: FieldType;
    value: string | boolean | undefined;
    placeholder: string;
    [key: string]: string | boolean | undefined;
  }
  interface PassWordField extends FormField {
    eyeVisibility: boolean;
  }

  type FiledList = Array<FormField | PassWordField>;

  interface DropDownList {
    title: string;
    value: string;
    description?: string;
    [key: string]: string;
  }

  interface formSendResult {
    success: boolean;
    text: string;
    img?: string;
  }

  interface jiraRequest {
    serviceDeskId: "2";
    requestTypeId: string;
    requestFieldValues: jiraFields;
  }

  interface user {
    token: string,
    user_display_name: string,
    user_email: string,
    user_nicename: string,
    company?: string,
    [key: string] : string
  }
}

export {};
