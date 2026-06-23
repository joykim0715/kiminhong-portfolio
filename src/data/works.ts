export type { Work } from "./content";
export { siteContent } from "./content";

import { siteContent } from "./content";

/** @deprecated siteContent.works.projects 를 직접 사용하세요 */
export const works = siteContent.works.projects;
