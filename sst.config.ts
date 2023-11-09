import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";

export default {
  config(_input) {
    return {
      name: "word-count-lambda-sst2",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(API);
  }
} satisfies SSTConfig;
