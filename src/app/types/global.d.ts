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
    blocked?: boolean;
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
    contractEndData?: string;
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
    slug?: string;
  }

  interface ExtendedService extends Service {
    id: string | number;
    description?: string;
    content?: string;
    platform?: string;
    best_choice_content?: string | undefined;
    best_choice_platform?: string | undefined;
  }

  type FileItem = {
    title: string;
    link: string;
    data: string;
  };

  interface FileListCustom {
    item: Service;
    files: Array<FileItem>;
  }

  type Preview = {
    title: string;
    related_entity: {
      id?: string | number;
      title: string;
    };
    sla_types: {
      title: string;
      label: string;
    };
    levels: {
      title: string;
      label: string;
    };
    responce_time: string | number;
  };

  type EventItem = {
    field: string;
    fromString?: string;
    toString?: string | null;
  };

  type HistoryEvent = {
    created: string;
    items: Array<EventItem>;
  };

  type Ticket = {
    key: string;
    changelog?: {
      histories: Array<HistoryEvent>;
    };
    fields: {
      customfield_10244: string;
      summary: string;
      status: {
        name: string;
      };
      customfield_10251: {
        id: string;
      };
      customfield_10228: {
        completedCycles: Object[]
      };
      resolutiondate: string | null;
      created: string | null;
      priority: {
        iconUrl: string | null;
        name: string;
      };
      timetracking: Array<object>;
    };
  };

  type NestedObject = {
    [key: string]:
      | NestedObject
      | string
      | number
      | boolean
      | null
      | undefined
      | Array<NestedObject>;
  };

  type DropDownListItems = {
    title: string;
    value: string;
  };
}

export {};
