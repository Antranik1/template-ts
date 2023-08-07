import { Diagram } from "./diagram";
import { assert } from "chai";

describe("Diagram class test", function () {
  describe("mode tests", () => {
    it("get default mode", function () {
      const diagram = new Diagram(0, 0, 0, "0");
      const mode = diagram.getMode();
      assert.equal(0, mode);
    });

    it("change mode to 1", function () {
      const diagram = new Diagram(0, 0, 0, "0");
      diagram.changeMode();
      const mode = diagram.getMode();
      assert.equal(1, mode);
    });

    it("re initialize mode", function () {
      const diagram = new Diagram(2, 0, 0, "0");
      diagram.changeMode();
      const mode = diagram.getMode();
      assert.equal(0, mode);
    });
  });
});
