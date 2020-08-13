# JSX 규칙

1\. tag는 꼭 닫아야한다.
- 태그 사이에 별다른 값이 없는 경우 self closing tag 사용 가능
```html
<Hello><Hello/>
===
<Hello />
```
2\. 2개 이상의 태그는 하나의 태그로 감싸져 있어야함.
  - <></> 로 감싸는 방법도 존재함.
```js
  return (
      <div>ㅎㅇ</div>
      <div>ㅂㅇ</div>
  );
  //사용 불가.
``` 
```js
return (
    <div>
        <div>ㅎㅇ</div>
        <div>ㅂㅇ</div>
    </div>
);
  ===
return (
    <>
        <div>ㅎㅇ</div>
        <div>ㅂㅇ</div>
    </>
);
  ```
  ---
## JS값 출력
JSX내부에서 javascript 값을 보여주고 싶을 때
변수를 {}로 감싸고 출력하면 된다.
```js
function App() {
  const name = 'jiwon';
  return (
    <>
      <div>{name}</div>
      <div>ㅂㅇ</div>
    </>
  );
}
```
## 스타일 지정
style을 지정해 주고 싶을 때
기존 html 에서 style을 지정해주는 방식과는 다르게 객체를 만들어줘야한다.

기존 css에서는 
```css
background-color : #fefefe;
```
이런 형태로 스타일을 지정했지만.

JSX에서는 style명에 -로 구분된경우 camelCase를 사용한다.
```js
const style = {
    backgroundColor : '#e3e3e3',
    fontWeight: 'bold',
    fontsize: '2em',
    padding: '10px'
};
```

## class 지정

기존 html에서는 
```html
<div class="myClass"></div>
```
형태로 클래스를 지정해줬지만

JSX에서는 className 을 사용하여 클래스를 지정해준다.

```css
/* App.css */
.myClass{
  background-color:#42AB28
}
```

```js
/* App.js */
.
. 기존 코드
.
import './App.css'; // App.css import
.
.
  return (
    <>
      <div className="myClass">ㅂㅇ</div>
    </>
  );

  ## 주석

  ```js
  // 한 줄 주석
  /* 여러 줄 가능 */
  ```