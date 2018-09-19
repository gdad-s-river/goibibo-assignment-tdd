Go Away, work in progress

## Why I used `react-testing-library`

Enzyme heavily uses shallow rendering, meaning it mocks the rendering of child components. It's difficult to test that way because, to test one component which might have multiple children, I'll have to cascade and iterate over testing the child component again and again (because of shallow rendering).

## Links that helped resolve things

1. https://stackoverflow.com/questions/41769880/how-to-manually-add-a-path-to-be-resolved-in-eslintrc along with https://github.com/tleunen/eslint-import-resolver-babel-module — To resolve module resoltution from `moduleDirectories` property in `jest.config.js` for `testUtils`

2. These two links saved me big time, for I was unable to detect why

```javascript
contactNumberElement.value = fakerContactNumber;
fireEvent.change(contactNumberElement, { bubble: true });
```

wasn't firing the change event at all. Here are the links —

- The problem — https://github.com/facebook/react/issues/10135
- The solution — https://github.com/facebook/react/issues/10135#issuecomment-401496776
- Reference in `react-testing-library` — https://github.com/kentcdodds/react-testing-library/pull/153
- `react-testing-library` solved it with this commit — https://github.com/kentcdodds/dom-testing-library/pull/85

3. This saved me from hitting my head in the wall in trying to figure out why jest was not picking up esm exported from some of the node modules (antd, in my cast) — https://github.com/facebook/jest/issues/6229#issuecomment-403539460

## Thinking / Architecting Things

App(state: {
contacts: type List(name, number)
})
ContactAddForm
UsernameInput (required)
ContactNumberInput (required)
SubmitButton
— ContactsList
ContactRow
ContactName
ContactNumber
Edit Button
Delete Button
— ContactEditInput
ContactNameEditInput (shouldn't be empty)
ContactNumberEditInput (shouldn't be empty)
SaveButton
