// ====== ADMIN

export interface AdminState {
  isCreateElementLoading: boolean;
  error: string | null;
  isUpdateElementLoading: boolean;
  isCreateMapLoading: boolean;
  isElementListLoading: boolean;
  elementList: ElementResponse | null;
  elementError: null | string;
  isMapListLoading: boolean;
  mapList: MapResponse | null;
}

export interface MapResponse {
  data: {
    id: string;
    width: number;
    height: number;
    name: string;
    thumbnail: string;
  }[];
}

export interface CreateNewElementRequest {
  imageUrl: string;
  width: number;
  height: number;
  static: boolean;
}

export interface CreateNewElementResponse {
  message: string;
  id: string;
}

export interface UpdateElementRequest {
  imageUrl: string;
}
export interface UpdateElementResponse {
  message: string;
}

export interface MapObj {
  elementId: string;
  x: number;
  y: number;
}
export interface CreateMapRequest {
  thumbnail: string;
  dimensions: string;
  name: string;
  defaultElements: MapObj[];
}
export interface CreateMapResponse {
  id: string;
}

export interface ElementObj {
  id: string;
  height: string;
  width: string;
  imageUrl: string;
  static: boolean;
  mapElements: MapObj[];
}
export interface ElementResponse {
  data: ElementObj[];
}
