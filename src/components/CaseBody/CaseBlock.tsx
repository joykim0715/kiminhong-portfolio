import DefaultModule from "./DefaultModule";
import MethodModule from "./MethodModule";
import ProblemModule from "./ProblemModule";
import ReflectionModule from "./ReflectionModule";
import ResultModule from "./ResultModule";
import RoleModule from "./RoleModule";
import type { ResultModuleProps } from "./types";

export default function CaseBlock(props: ResultModuleProps) {
  switch (props.block.id) {
    case "problem":
      return <ProblemModule {...props} />;
    case "role":
      return <RoleModule {...props} />;
    case "method":
      return <MethodModule {...props} />;
    case "results":
    case "outcome":
      return <ResultModule {...props} />;
    case "insights":
    case "learnings":
      return <ReflectionModule {...props} />;
    default:
      return <DefaultModule {...props} />;
  }
}
