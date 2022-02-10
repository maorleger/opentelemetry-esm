## A small repro demonstrating an issue with ESM and OTel instrumentations

To run:

```
# Use a modern version of nodeJS. I used 16.13.1 as well as 17.4.0 here but you can use any version that supports
# ESM, like 14, 16, etc. If you use nvm I included an nvmrc file
> nvm use

# Install the dependencies
> npm install

# When using CommonJS, require-in-the-middle works as expected
> node index.js

# When using ESM, no spans are produced
> node index.mjs
```
