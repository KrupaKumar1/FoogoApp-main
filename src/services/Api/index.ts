import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

const Baseurl = 'http://devposapitest.restrozap.biz/';

interface API_CALL_Params {
  method: string;
  url: string;
  data?: any;
  params?: any;
  type?: any;
  callback?: (data: any) => void;
  headerConfig?: any;
  file?: boolean;
  onUploadProgress?: (percent: number) => boolean;
  cancelToken?: any;
}

const API_CALL = ({
  method,
  url,
  data,
  params,
  callback,
  headerConfig,
  file,
  onUploadProgress,
  cancelToken,
}: API_CALL_Params) => {
  let header: AxiosRequestConfig['headers'];
  // To change the header configuration - specific
  headerConfig ? (header = {...headerConfig}) : {header};
  if (callback) {
    axios({
      method,
      url: Baseurl + url,
      data,
      params,
      headers: header,
      validateStatus: (status: number) => {
        if (status === 401) {
          console.log('error');
        }
        return true; // or false, depending on your logic
      },
      responseType: file ? 'arraybuffer' : 'json',
      onUploadProgress: ({loaded, total}) => {
        if (total !== undefined) {
          let percent = Math.floor((loaded * 100) / total);
          return onUploadProgress ? onUploadProgress(percent) : false;
        }
      },
      cancelToken,
    }).then((data: AxiosResponse) => {
      return callback(data);
    });
  }
};

export default API_CALL;
