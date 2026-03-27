declare module "*.svg" {
  import type { SVGProps } from "react";
  const ReactComponent: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  export default ReactComponent;
}

declare module "*.svg?react" {
  import type { SVGProps } from "react";
  const ReactComponent: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  export default ReactComponent;
}
