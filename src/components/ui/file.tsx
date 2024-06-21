import { ReactNode, createContext, useContext, useReducer } from "react";
import axios from "axios";
import { API_READ, API_READ_FILES, API_UPLOAD } from "@/constants/api"

enum FileActionType {
  UPLOAD_FILE = "UPLOAD_FILE",
  READ_FILE_DATA = "READ_FILE_DATA",
  READ_DATA = "READ_DATA",
  ERROR = "ERROR"
}

type ReducerAction<T, P> = {
  type: T;
  payload?: P;
};

type FileContextState = {
  isLoading: boolean;
  file: File | null;
  data: ReadResponseType | null;
  // data: ReadResponseType | File[] | FileType[];
  fileList: FileHistory[] | null;
  type: FileActionType | null;
  message?: ResponseMessageType | null
};

type LinksResponseType = {
  active: boolean
  label: "&laquo; Previous"
  url: string

}

type ReadResponseType = {
  current_page: number
  data: DataSales[] | null
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: LinksResponseType[]
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: string
  to: number
  total: number

}

type FileHistory = {
  id: number
  filename: string
  created_at: Date
  updated_at: Date
}

type DataSales = {
  "id": number,
  "historico_id": number,
  "name": string,
  "governmentId": string,
  "email": string,
  "debtAmount": string,
  "debtDueDate": Date,
  "debtId": string,
  "created_at": Date,
  "updated_at": Date
}

interface FileType {
  name: string;
  size: number;
  data: any | File;
}

type FileAction = ReducerAction<
  FileActionType,
  Partial<FileContextState>
>;

type FileDispatch = (action: FileAction) => void;

type FileContextType = {
  state: FileContextState;
  dispatch: FileDispatch;
};

type FileProviderProps = { children: ReactNode };

enum MessageType {
  Error = "Error",
  Success = "Success"
}

type ResponseMessageType = {
  text: string
  type: MessageType
}

export const FileContextInitialValues: FileContextState = {
  file: null,
  isLoading: false,
  fileList: null,
  data: null,
  type: null,
  message: null
};

const FileContext = createContext<FileContextType | undefined>(undefined);

const FileReducer = (
  state: FileContextState,
  action: FileAction,
): FileContextState => {
  switch (action.type) {
    case FileActionType.UPLOAD_FILE:
      return {
        ...state,
        isLoading: action.payload?.isLoading || false,
        file: action.payload?.file || null,
        type: FileActionType.UPLOAD_FILE
      };
    case FileActionType.READ_FILE_DATA:
      return {
        ...state,
        isLoading: action.payload?.isLoading || false,
        fileList: action.payload?.fileList || null,
        type: FileActionType.READ_FILE_DATA
      };
    case FileActionType.READ_DATA:
      return {
        ...state,
        isLoading: action.payload?.isLoading || false,
        data: action.payload?.data || null,
        type: FileActionType.READ_DATA
      };
    case FileActionType.ERROR:
      return {
        ...state,
        isLoading: action.payload?.isLoading || false,
        message: action.payload?.message || null,
        type: FileActionType.ERROR
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const FileProvider = ({ children }: FileProviderProps) => {
  const [state, dispatch] = useReducer(
    FileReducer,
    FileContextInitialValues
  );

  return (
    <FileContext.Provider value={{ state, dispatch }}>
      {children}
    </FileContext.Provider>
  );
};

const useFileContext = () => {
  const context = useContext(FileContext);

  if (context === undefined)
    throw new Error("useFileContext must be used within a FileProvider");

  return context;
};

const uploadFile = async (dispatch: FileDispatch, file: File) => {
  dispatch({ type: FileActionType.UPLOAD_FILE, payload: { isLoading: true } });
  try {
    const response = await axios.post(API_UPLOAD, { file: file }, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        "Accept": '*/*'
      },
    });
    dispatch({ type: FileActionType.UPLOAD_FILE, payload: { type: FileActionType.UPLOAD_FILE, file: response.data.file, isLoading: false, message: { text: "Upload File Success", type: MessageType.Success } } });
  } catch (error) {
    console.error('Failed to upload file', error);
    dispatch({ type: FileActionType.ERROR, payload: { type: FileActionType.ERROR, isLoading: false, message: { text: "Error to Upload File, try Again Later", type: MessageType.Error } } });
  }
};

const listFiles = async (dispatch: FileDispatch) => {
  dispatch({ type: FileActionType.READ_FILE_DATA, payload: { isLoading: true } });
  try {
    const request_data = API_READ_FILES

    const response = await axios.get(request_data);
    console.log("axios repond")
    console.log(response)

    dispatch({ type: FileActionType.READ_FILE_DATA, payload: { type: FileActionType.READ_FILE_DATA, fileList: response.data as FileHistory[], isLoading: false } });
  } catch (error) {
    console.error('Failed to list files', error);
    dispatch({ type: FileActionType.ERROR, payload: { type: FileActionType.ERROR, isLoading: false, message: { text: "Error to List Data, try Again Later", type: MessageType.Error } } });
  }
};

const readData = async (dispatch: FileDispatch, url: string | null = null) => {
  dispatch({ type: FileActionType.READ_DATA, payload: { isLoading: true } });
  try {
    const request_data = (url) ? url : API_READ

    const response = await axios.get(request_data);
    console.log("axios repond")
    console.log(response)

    dispatch({ type: FileActionType.READ_DATA, payload: { type: FileActionType.READ_DATA, "data": response.data as ReadResponseType, isLoading: false } });
  } catch (error) {
    console.error('Failed to list files', error);
    dispatch({ type: FileActionType.ERROR, payload: { type: FileActionType.ERROR, isLoading: false, message: { text: "Error to List Data, try Again Later", type: MessageType.Error } } });
  }
};

export { FileProvider, useFileContext, uploadFile, listFiles, readData };
export type { FileDispatch, FileAction, FileType, DataSales, LinksResponseType, FileHistory };
export { FileActionType, MessageType };
