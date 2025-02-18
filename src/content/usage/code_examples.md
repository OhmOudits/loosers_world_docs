# Code Examples

Explore common usage patterns and examples.

## Basic Usage

Here's a simple example:

```typescript
import { createWidget } from 'my-package';

const widget = createWidget({
  title: 'My Widget',
  theme: 'dark'
});

widget.render();
```

## Advanced Patterns

For more complex scenarios:

```typescript
import { Widget, useTheme } from 'my-package';

function CustomWidget() {
  const theme = useTheme();
  
  return (
    <Widget
      theme={theme}
      onUpdate={() => {
        console.log('Widget updated');
      }}
    />
  );
}
```