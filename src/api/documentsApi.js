import API from './api';

const emailDocument = params =>
  API.add({
    method: 'POST',
    endPoint: 'documents/emailDocument',
    payload: params,
    useAuth: true
  });

const getPdf = params =>
  API.add({
    method: 'POST',
    endPoint: 'documents/getPdf',
    payload: params,
    useAuth: true
  });

const DocumentsApi = {
  getPdf,
  emailDocument
};

export default DocumentsApi;
