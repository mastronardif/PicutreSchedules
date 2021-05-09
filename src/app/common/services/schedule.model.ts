//declare module namespaceSchedule {

  export interface Row {
      picture: string;
      name: string;
  }

  export interface Data {
      description: string;
      row: Row[];
  }

  export interface ScheduleRootObject {
      data: Data;
      id?: string;
  }

//}

