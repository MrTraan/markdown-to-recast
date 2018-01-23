# markdown-to-recast
A markdown parser that outputs to Recast.AI Bot Connector's format

Usage:
```javascript
  const mdRecast = require('md-recast');
  
  const formatted = mdRecast(`
This is a nice picture of my cat:
![my cat image](http://cats.com/nice.jpg)
such cute.
`);

console.log(formatted);
// [ { type: 'text', content: 'This is a nice picture of my cat:' },
//  { type: 'picture', content: 'http://cats.com/nice.jpg' },
//  { type: 'text', content: 'such cute.' } ]
```
