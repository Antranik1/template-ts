import { Diagram } from "./diagram";
import { assert } from "chai";

describe("Diagram class test", function () {
  describe("mode tests", () => {
    it("get default mode", function () {
      const diagram = new Diagram(0, 0, "0");
      const mode = diagram.getMode();
      assert.equal(0, mode);
    });

    it("change mode to 1", function () {
      const diagram = new Diagram(0, 0, "0");
      diagram.changeMode();
      const mode = diagram.getMode();
      assert.equal(1, mode);
    });

    it("re initialize mode", function () {
      const diagram = new Diagram(0, 0, "0");
      diagram.changeMode();
      diagram.changeMode();
      diagram.changeMode();
      const mode = diagram.getMode();
      assert.equal(0, mode);
    });

    it("check mode", function () {
      const diagram = new Diagram(0, 0, "0");
      for (let index = 0; index < 6; index++) {
        const mode = diagram.getMode();
        assert.equal(index % 3, mode);
        diagram.changeMode();
      }
    });
  });
});
