import TamlComponent from "@taml/react";

export default function Taml(props: { children: string }) {
  return (
    <div className="taml-outer">
      <pre className="taml-inner">
        <code>
          <TamlComponent>{props.children}</TamlComponent>
        </code>
      </pre>
    </div>
  );
}
