import HttpClient from "./HttpClient";
import {CRAWLING_DATA} from "./constants";

class CrawlingApi {
  static crawlData(info) {
      return HttpClient.get(CRAWLING_DATA, {params: {link : info.url}});
  }
}

export default CrawlingApi;
