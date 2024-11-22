// ====== ADMIN

export interface AdminState {
  isCreateElementLoading: boolean;
  error: string | null;
  isUpdateElementLoading: boolean;
  isCreateMapLoading: boolean;
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

export interface Map {
  elementId: string;
  x: number;
  y: number;
}
export interface CreateMapRequest {
  thumbnail: string;
  dimensions: string;
  name: string;
  defaultElements: Map[];
}
export interface CreateMapResponse {
  id: string;
}

//
