// export class Tag {
//   id: string;
//   policyNumber: string;
//   creationDate: Date;
//   effectiveDate: Date;
//   expireDate: Date;
//   paymentOption: string;
//   policyAmount: number;
//   extraInfo: string;
// }

export interface TagElement {
  name: string;
  // position: number;
  // weight: number;
  // symbol: string;

  //bMarker: boolean;
}
export class QueryTag {
  //where: string;
  whereClause: string;
  tags: TagElement[]
}

export class Quill {
  id: string;
  title: string;
  content: string;
}
