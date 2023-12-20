export enum JobStatus {
  open = "open",
  close = "close"
}

export enum OptionType {
  select = "select",
  input = "input",
}

export enum QuestionType {
  mcq = "mcq",
  list = "list",
}

export enum GenderType {
  male = "male",
  female = "female"
}

export enum LoginSource {
  facebook = "facebook",
  google = "google",
  apple = "apple",
  default = "default",
}

export enum VisitStatus {
  inProgress = "inProgress",
  complete = "complete"
}

// export enum PrismaModel {
//   "user",
//   "post",
//  "profile"
// }
export enum GeoJSONObjectTypes {
  point = "Point",
  lineString = "LineString",
  polygon = "Polygon",
  multiPoint = "MultiPoint",
  multiLineString = "MultiLineString",
  multiPolygon = "MultiPolygon",
  geometryCollection = "GeometryCollection"
}


export enum JobApplicationStatus{
  interviewed = 'interviewed', 
  candidate = 'candidate', 
  applied = 'applied', 
  hired = 'hired', 
  rejected = 'rejected', 
  contacted = 'contacted',
  reviewed = 'reviewed'
}



export function getEnumValues<T extends string | number>(e: any): T[] {
  return typeof e === 'object' ? Object.values(e) : [];
}