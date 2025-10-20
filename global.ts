/// <reference types="@total-typescript/ts-reset" />

declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        TYPE?: "format";
      }
    }
  }
}
