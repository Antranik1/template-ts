# template-ts
This project is the kata for GE Healthcare
I made three branches, each one has its purpose :

- kata-GE contains the main features :
  - The watch with the current time
  - A button "mode" to change mode
  - A button "increase" to increase hours or minutes
  - A button "light" to turn on the screen
  - Plus additional features :
    - We can display multiple clock at the same time. Each clock will be able to display a different time. We can choose the timezone in a dropdown list.
    - A new button to change the display between 24h and AM/PM format
   
- kata-GE-animation which contains animations features such as
  -  Rotation
  -  Flip
  -  Multiplication
  -  Translation

- kata-GE-go-further which init cypress tests and containerization with docker.

Each branch has its PR. The PR to merge kata-GE-go-further is in draft because i did not have the time to finish it.

```javascript
npm install
npm run build
npm run start
npm run format
npx tsc then manually correct imports on dist/..tests classes => add .js to some imports
only now add "type": "module" on package.json
npm run test
remove "type": "module" when you want to rebuilb
=> Do this each time you need to launch tests => do not work with the test of index...
```
