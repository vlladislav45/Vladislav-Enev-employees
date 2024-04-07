import BaseApi from './base.api.ts';

class EmployeeApi extends BaseApi {
  create = (formData: FormData) => this.post('employees', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
    },
  });

  getAll = () => this.get('employees/all', {});
}

export default new EmployeeApi();
