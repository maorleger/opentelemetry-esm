import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-base";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";

const provider = new NodeTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "basic-service"
  })
});
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.register();

registerInstrumentations({
  instrumentations: [getNodeAutoInstrumentations()]
});

import https from "https";

function doRequest(url) {
  return new Promise(function (resolve, reject) {
    https.get(url, (res) => {
      // There's no need to read the entire data-stream as it's unrelated to this issue, so just resolve with this chunk
      res.on("data", (d) => resolve(d.toString()));
      res.on("error", (e) => reject(e));
    });
  });
}

console.log("Running using ESM");
doRequest("https://www.google.com/").then(console.log).catch(console.error);
