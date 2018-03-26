import HttpClient from "./HttpClient";
import {GET_CRAWLED_DATA_URL, CITIES_AND_DISTRICTS} from "./constants";

class CrawledDataApi {
  static getCrawledData(pageNumber, pageSize) {
    return HttpClient.get(GET_CRAWLED_DATA_URL, {params: {"page" : pageNumber, "size" : pageSize}});
  }

  static getCitiesAndDistrict() {
    return HttpClient.get(CITIES_AND_DISTRICTS);
  }
}

export default CrawledDataApi;
