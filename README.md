# postcss-doodle

![Build Status](https://github.com/css-doodle/postcss-doodle/actions/workflows/ci.yml/badge.svg)
![license](https://img.shields.io/github/license/mashape/apistatus.svg)


[PostCSS] plugin to use generators from [css-doodle] with the same syntax.

[PostCSS]: https://github.com/postcss/postcss
[css-doodle]: https://github.com/css-doodle
[@shape]: https://yuanchuan.dev/polygon-shapes
[@svg]: https://yuanchuan.dev/experimenting-a-new-syntax-to-write-svg


## Installation

```bash
npm i -D postcss-doodle
```

## Usage

```js
postcss([ require('postcss-doodle') ])
```


## Supported functions

### [@svg]

```css
background: @svg(
  viewBox: -5 -5 10 10;
  circle {
    r: 5;
    fill: deeppink;
  }
)
```

### [@shape]

```css
clip-path: @shape(
  points: 5;
  turn: 2;
)
```

## TODO

* @doodle
