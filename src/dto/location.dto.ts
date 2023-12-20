import { GeoJSONObjectTypes } from "../enums/enums";

export class LocationDTO {
  type : GeoJSONObjectTypes | null = GeoJSONObjectTypes.point;
  coordinates: [ Number | null, Number | null] = [null , null];
  formattedAddress: String | null = '';
  street: String | null = '';
  zipcode: String | null = '';
  cityId: String | null = '';
  stateId: String | null = '';
  countryId: String | null = '';
}

export interface ILocation {
  type : GeoJSONObjectTypes | null ;
  coordinates: [ Number | null, Number | null] ;
  formattedAddress: String | null ;
  street: String | null ;
  zipcode: String | null ;
  cityId: String | null ;
  stateId: String | null ;
  countryId: String | null ;
}
