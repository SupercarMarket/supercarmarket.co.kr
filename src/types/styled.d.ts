import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fontSize: {
      "header-36": "36px";
      "header-24": "24px";
      "header-20": "20px";
      "header-16": "16px";
      "header-14": "14px";
      "body-24": "24px";
      "body-20": "20px";
      "body-16": "16px";
      "body-14": "14px";
      "body-12": "12px";
    };
    fontWeight: {
      bold: 700;
      regular: 400;
    };
  }
}
