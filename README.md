# Scroll Trigger

> A mimic version of GSAP ScrollTrigger 👀

## Getting started

### Download

Self hosted 👉 https://github.com/vuquangpham/scroll-trigger/

### Initialize

#### Options

| Name                    | Default         | Description                                                                |
|-------------------------|-----------------|----------------------------------------------------------------------------|
| `id`                    | `unique`        |                                                                            |
| `start`                 | `top top`       |                                                                            |
| `end`                   | `bottom bottom` |                                                                            |
| `responsive`            | `[]`            | change the observed breakpoint (`start` and `end`) on different breakpoint |
| `onEnter:(self) => {}`  | `function`      |                                                                            |
| `onLeave:(self) => {}`  | `function`      |                                                                            |
| `onUpdate:(self) => {}` | `function`      |                                                                            |

### Methods

| Name      | Parameter  | Description                        |
|-----------|------------|------------------------------------|
| `create`  | `object`   | create the instance                |
| `get`     | `id`       | get the ScrollTrigger instance     |
| `destroy` | `instance` | destroy the ScrollTrigger instance |

```js
const instance = ScrollTrigger.create({
    start: 'top center', // trigger when top of the element hits the center of the viewport
    end: () => '+=' + 300, // end when scroll 300px after trigger
    onUpdate: (self) => {
        console.log('Progress:', self.progress);
    },
    responsive: [
        {
            breakpoint: 1024,
            start: 'top 60%', // top of the element hits the 60% of the viewport
            end: 'bottom 60%+=200px' // end when the bottom of the element hit the (60% + 200px) of the viewport
        }
    ]
});
```

#### Events

| Name                    | Description                                                             |
|-------------------------|-------------------------------------------------------------------------|
| `onEnter:(self) => {}`  | trigger at the first time that the element hits the viewport breakpoint |
| `onUpdate:(self) => {}` | trigger on each scroll event when the element in viewport               |
| `onLeave:(self) => {}`  | trigger when the element goes out of viewport                           |

## Deployment

Run `./public` and `./dev` in live server

```shell
npm run dev
```

Build files from `./src` and `./dev` to `./dist` for production

```shell
npm run build
```

Build files from `./src` for production

```shell
npm run prod
```
