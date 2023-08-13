export const watchTemplate = (clockId: string): string => `
<!doctype html>
<html>
  <div id="${clockId}" class="watch animate">
    <div id="dial" class="dial day">
      <div class="time">
        <span id="clockHour"></span>
        <span>:</span>
        <span id="clockMinutes"></span>
        <span id="clockSeconds" class="seconds"></span>
        <span id="amPm" class="seconds"></span>
      </div>
    </div>
    <div id="mode" class="bouton mode" title="mode"></div>
    <div id="increase" class="bouton increase" title="increase"></div>
    <div id="light" class="bouton light" title="light"></div>
  </div>

  <div class="container">
    <fieldset>
      <legend>Additionnal Features</legend>
      <div class="button-container">
        <button id="reset">Reset clock</button>
        <button id="changeAmPm">AM/PM - 24h</button>
      </div>
    </fieldset>

    <fieldset>
      <legend>Animations</legend>
      <div class="button-container">
        <button id="rotate">Rotate</button>
        <button id="flip">Flip</button>
        <button id="multiply">Multiply</button>
        <button id="translate">Translate</button>
      </div>
    </fieldset>
  </div>
</html>
`;
