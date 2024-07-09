import HttpServices from "../httpServices";
import { ENDPOINTS } from "../helpers/endpoints";
import { header } from "../helpers/constants";

class AppService extends HttpServices {
  static getAllUsers({ pageNumber = 1 }) {
    return this.get(`${ENDPOINTS.getAllUsers}?page=${pageNumber}`, header);
  }
}

export default AppService;
