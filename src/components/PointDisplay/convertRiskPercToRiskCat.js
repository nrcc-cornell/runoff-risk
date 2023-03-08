export default function convertRiskPercToRiskCat(p) {
  let cat=null
  if (p>=100 && p<117) {cat = 0};
  if (p>=0 && p<30) {cat = 1};
  if (p>=30 && p<60) {cat = 2};
  if (p>=60 && p<90) {cat = 3};
  if (p>=90 && p<100) {cat = 4};
  if (p>=117 && p<=125) {cat = 5};
  return cat
}