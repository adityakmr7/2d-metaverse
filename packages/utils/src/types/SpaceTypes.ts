export interface CreateSpaceRequest {
  name: string;
  dimensions: string;
  thumbnail?: string;
}
export interface CreateSpaceResponse {
  spaceId: string;
}
export interface IndividualSpaceResponse {
  dimensions: string | null;
  elements: Element[] | [];
}
export interface SpaceState {
  spaceId: string | null;
  loading: boolean;
  error: string | null;
  loadingSpace: boolean;
  spaceList: Space[] | [];
  spaceError: string | null;
  // INDIVIDUAL SPACE
  isLoadingIndividualSpace: boolean;
  individualSpaceData: IndividualSpaceResponse | null;
  individualSpaceError: string | null;
}
export interface Space {
  id: string;
  name: string;
  thumbnail: string | null;
  dimensions: string;
}
export interface FetchAllSpaceResponse {
  spaces: Space[];
}

export interface IndividualSpaceRequest {
  spaceId: string;
}

export interface Element {
  imageUrl: string | null;
  width: number;
  height: number;
  static: boolean;
}

// ====== ELEMENT========
export interface AddElementToSpaceRequest {
  spaceId: string;
  elementId: string;
  x: number;
  y: number;
}
export interface AddElementToSpaceResponse {
  message: string;
}

export interface DeleteElementFromSpaceResponse {
  message: string;
}

export interface DeleteElementFromSpaceRequest {
  id: string;
}
