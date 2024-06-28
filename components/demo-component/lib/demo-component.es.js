import { openBlock as r, createElementBlock as s } from "vue";
const _ = (e, o) => {
  const t = e.__vccOpts || e;
  for (const [n, c] of o)
    t[n] = c;
  return t;
}, m = {};
function a(e, o) {
  return r(), s("div", null, "This is component demo");
}
const l = /* @__PURE__ */ _(m, [["render", a]]);
export {
  l as default
};
