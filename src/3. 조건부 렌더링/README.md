# 조건부 렌더링

자바스크립트에서 동작하는 것과 동일하게 동작함.

if나 조건연산자 같은 연산자를 사용해서 상황별로 다른 결과 값을 렌더링 할 수 있음.

```js
/* App.js */
  return (
    <Wrapper>
    <Hello name ="jiwon" color="green" isSpecial={true}/>
    <Hello color="pink" />
    </Wrapper>
  )
```
App.js에서 Hello컴포넌트에 isSpecial이라는 props를 설정해준다.

```js
/* Hello.js */
function Hello({color, name, isSpecial}){
    return <div style={{color}}>
        {isSpecial ? <b>*</b> : null}
        ㅎㅇ {name}</div>;
}
```

이후 Hello.js 에서 
```
{isSpecial ? <b>*</b> : null}
```
형태의 삼항연산자를 추가해주는데
이는 isSpecial의 값이 true이면 *을 false 면 null을 출력해 준다.

JSX에서 null , false , undefined 등을 렌더링하면 아무것도 나타나지 않는다. (0 은 제외)

이를 응용하여 여러 형태의 조건부 렌더링을 구현할 수 있다.
```js
{isSpecial && <b>*</b>}
```
를 사용하면 isSpecial이 True이면 *을 렌더링하고 False 이면 && 연산이 false 가 되기 때문에 아무것도 출력되지 않는다.
