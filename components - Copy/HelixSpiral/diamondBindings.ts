export interface DiamondBinding {
  index: number;
  image: string;
  targetSection: string;
}

// Each diamond navigates to the most relevant section on the page:
//   0 – logo/beacon → #top
//   1 – scattered systems → #problem
//   2 – manual work → #problem
//   3 – missed calls → #problem
//   4 – commission engine → #solution
//   5 – live dashboards → #solution
//   6 – compliance → #solution
//   7 – tired of consultants → #founder
export const DIAMOND_BINDINGS: DiamondBinding[] = [
  { index: 0, image: "sgc-logo-beacon.png", targetSection: "#top" },
  { index: 1, image: "excel.png",           targetSection: "#problem" },
  { index: 2, image: "manual.png",          targetSection: "#problem" },
  { index: 3, image: "6pm.png",             targetSection: "#problem" },
  { index: 4, image: "dispute.png",         targetSection: "#solution" },
  { index: 5, image: "month.png",           targetSection: "#solution" },
  { index: 6, image: "150k.png",            targetSection: "#solution" },
  { index: 7, image: "yourtime.png",        targetSection: "#founder" },
];

/** Quick lookup helper: get target section by diamond index */
export function getTargetSection(index: number): string {
  return DIAMOND_BINDINGS[index]?.targetSection ?? "#top";
}
