# Getting Started with Custom Component Libraries

This guide will walk you through creating a simple "Hello, World" component to demonstrate the fundamental concepts of Retool custom components.

## 1. Set Up Your Development Environment

To begin, you'll need to set up a local development environment. This involves cloning a template repository provided by Retool.

First, ensure you have Node.js (version 20 or later) installed. Then, open your terminal and run the following commands:

```bash
git clone https://github.com/tryretool/custom-component-collection-template.git new-custom-component
cd new-custom-component
npm install
```

These commands will download the template, navigate you into the project directory, and install the necessary dependencies.

## 2. Log in to Retool from the Command Line

Next, you'll need to authenticate with your Retool account using the command-line interface (CLI). This requires an API key, which you can generate in your Retool settings.

```bash
npx retool-ccl login
```

This command will prompt you for your Retool domain and the API key you generated.

## 3. Initialize Your Component Library

Now, you can create a new component library within your Retool instance.

```bash
npx retool-ccl init
```

This command will guide you through naming and describing your new library.

## 4. Start the Development Server

To see your component in action as you develop it, start the development server:

```bash
npx retool-ccl dev
```

This command watches for file changes and automatically updates your component in the Retool editor.

## 5. The "Hello, World" Component

Open the `src/index.tsx` file in your project. This is where you will define your React component. The template comes with a simple "Hello, World" component to get you started.

Here is a basic example of what the code in `src/index.tsx` might look like:

```typescript
import React from 'react';
import { Retool } from '@tryretool/custom-components';

export const HelloWorldComponent: React.FC = () => {
  const [name, setName] = Retool.useStateString({
    name: "name",
  });

  return (
    <div>
      Hello {name}!
    </div>
  );
};
```

This component uses the `Retool.useStateString` hook to create a string variable named `name` that can be controlled from the Retool editor.

## 6. Add Your Component to a Retool App

Now, open a Retool application. In the component list on the right, you should see a new section with the name of your component library. Drag your `HelloWorldComponent` onto the canvas.

In the Inspector on the right, you will see a "name" property for your component. You can now dynamically change the name displayed by your component by updating this property.
