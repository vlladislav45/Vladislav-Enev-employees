import BaseApi from './base.api.ts';

class EmployeeApi extends BaseApi {
  create = (formData: FormData) => this.post('employees', formData);

  getAll = (formData: FormData) => this.get('employees/all', formData);
}

export default new EmployeeApi();
