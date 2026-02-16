# Custom Component Examples

## Interactive Button

To further illustrate the power of custom components, let's create a component with a button that can trigger a query in your Retool application.

```typescript
import React from 'react';
import { Retool } from '@tryretool/custom-components';

export const InteractiveButton: React.FC = () => {
  const [buttonText, setButtonText] = Retool.useStateString({
    name: "buttonText",
    initialValue: "Click Me",
  });

  const onButtonClick = () => {
    Retool.triggerQuery('myQuery');
  };

  return (
    <button onClick={onButtonClick}>
      {buttonText}
    </button>
  );
};
```

In this example:

*   We've created a `buttonText` state variable that can be configured from the Retool editor.
*   The `onButtonClick` function uses `Retool.triggerQuery` to execute a query named `myQuery` within the Retool application.

## Deploying Your Component

Once you are happy with your component, you can deploy it to your Retool instance.

```bash
npx retool-ccl deploy
```

This will create a permanent, versioned copy of your component that can be used in your production applications. To use the deployed version, you'll need to select it from the version dropdown in the component's Inspector in the Retool editor.

## Further Exploration

This tutorial provides a basic introduction to creating custom components in Retool. You can explore more advanced topics such as:

*   **Passing data from Retool to your component:** Use the `Retool.useState` hooks for various data types.
*   **Emitting events from your component:** Use the `Retool.triggerQuery` function to run queries or JavaScript in your Retool app.
*   **Using third-party libraries:** You can add any npm package to your custom component project.
*   **Styling your components:** Use CSS to style your components to match your application's design.

For more in-depth examples and documentation, refer to the official Retool documentation and the `custom-component-examples` GitHub repository.

You can find more examples on the official Retool GitHub page: [https://github.com/tryretool/custom-component-examples](https://github.com/tryretool/custom-component-examples)
