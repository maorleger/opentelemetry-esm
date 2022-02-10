const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { ConsoleSpanExporter } = require("@opentelemetry/sdk-trace-base");
const {
  getNodeAutoInstrumentations
} = require("@opentelemetry/auto-instrumentations-node");
const { SimpleSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const { Resource } = require("@opentelemetry/resources");
const {
  SemanticResourceAttributes
} = require("@opentelemetry/semantic-conventions");

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

const https = require("https");

function doRequest(url) {
  return new Promise(function (resolve, reject) {
    https.get(url, (res) => {
      // There's no need to read the entire data-stream as it's unrelated to this issue, so just resolve with this chunk
      res.on("data", (d) => resolve(d.toString()));
      res.on("error", (e) => reject(e));
    });
  });
}

console.log("Running using CJS");
doRequest("https://www.google.com/").then(console.log).catch(console.error);
