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

  interface User {
    token: string;
    user_display_name: string;
    user_email: string;
    user_nicename: string;
    company?: string;
    id: string;
    [key: string]: string;
  }

  interface FromError {
    code: string;
    message: string;
    [key: string]: string;
  }

  type ServiceAgreement = {
    type: string;
    value: string;
  };

  type ServiceStatus = {
    title: string;
    denger_level: number;
  };

  // type ServiceLevel = {
  //   type: {
  //     value: string;
  //     label: string;
  //   };
  //   level: {
  //     value: string;
  //     label: string;
  //   };
  // };
  interface Service {
    title: string;
    icon?: string;
    contractEndData?: string;
    serviceLevels?: Array<ServiceAgreement>;
    status?: ServiceStatus;
  }

  interface ExtendedService extends Service {
    id: string | number;
    description?: string;
    content?: string;
    platform?: string;
    best_choice_content?: string | undefined;
    best_choice_platform?: string | undefined;
  }
}

export {};
