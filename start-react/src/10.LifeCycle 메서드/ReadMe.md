# LifeCycle 메서드
한국어로 생명주기 메서드라고 부른다.
컴포넌트가 브라우저상에 나타나고 업데이트되고, 사라지게 될 때 호출 되는 메서드들이다. 추가적으로 컴포넌트에 에러가 났을 때 호출 되는 메서드도 LifeCycle 메서드의 일부이다.
이는 클래스형 컴포넌트에서 사용할 수 있다.

생성 될 때
컴포넌트가 화면에 안보여지고 있다가 보여질 때를 의미한다.
생성 될 때는 constructor가 먼저 실행된다.

그리고 getDrivedStateFromProps는 props로 받아온 것을 state에 넣어야 할 때 이 메서드를 사용한다.

render 클래스 형태로 만든 컴포넌트에서 뭘 보여 줄 것인지.

React DOM 및 refs 업데이트 브라우저에 나타날 때
그다음 componentDidMount 가 발생한다. 이 시점에 브라우저에 우리가 원하는 형태가 보여지고 있다.

업데이트 할 때
컴포넌트가 리렌더링 될 때를 의미한다. 자신의 상태나 부모컴포넌트 리렌더링 될 때, 이 때 getDrivedStateFromProps는 마찬가지로 props로 받아온 것을 state로 넣어 줘야할 때 사용

shouldComponentUpdate는 컴포넌트를 최적화 해야하는 단계에서 사용한다. 컴포넌트에서 리렌더링이 불 필요한 시점에서 리렌더링을 막아 줄 수 있다. true를 반환하면 render가 호출 되고 아니면 false를 반환하면 멈춰서 렌더가 이뤄지지 않는다.
true가 반환되면 render 되고 getSnapshotBeforeUpdate 가 호출 된다. 이것은 브라우저에 변화를 일으키기 바로 직전에 사용된다. 그리고 마지막으로 
componentDidupdate가 호출된다.

제거 할 때에는
componentWillUnmount 가 호출 된다. 주로 componentDidMount에서 이벤트를 등록했을때 그것들을 지워주는 작업들을 지워주는 작업을 한다.

### 마운트
- constructor
    constructor 생성자 함수는 컴포넌트가 가장 처음 만들어질 때 호출되는 함수.
    super(props);를 해주는데 원래 react component라는 class가 지니고 있는 constructor 가 있는데 그 constructor를 덮어 씌우는 것인데 먼저 리액트가 지닌 constructor를 한번 호출해 주고 나서 덮어 씌우는것 때문에 super를 사용한다.
- getDerivedStateFromProps
    여기서는 두가지 파라미터로 nextProps, prevState를 받아온다. 만약 현재 지니고 있는 props랑 state 내의 어떤 값이랑 다를 때, 어떤 객체를 return 하게 된다면 해당 값을 현재 상태에 반영시켜 준다. props로 받아온 어떤 값을 state에 동기화시켜주는 역할을 한다.
- render
    render는 위의 두개가 호출 되고 render된 다음 모든 작업을 마치고 나서 모든 작업을 마치고 난 다음 브라우저에 컴포넌트가 보여졋을 때 아래가 실행된다.
- componentDidMount 
    이 메서드가 호출되는 시점에서는 컴포넌트에 있는 엘리먼트들이 브라우저에 나타난 상태여서 DOM에 직접 접근할 수 있다.

### 업데이트
- getDerivedStateFromProps
    컴포넌트가 마운드 될 때, 업데이트 될 때 호출되고 props로 받아온 값을 state로 넣어주고 싶을 때 사용
- shouldComponentUpdate
    만약 이 메서드에서 false를 반환하면 리렌더링을 하지 않고 true를 반환하면 리렌더링을 한다. 만약 이 메서드를 따로 구현하지 않으면 무조건 리렌더링 하게 된다.
- render
- getSnapshotBeforeUpdate
    shouldComponentUpdate 에서 true를 반환하면 render를 하고 이 함수가 호출된다. 컴포넌트가 리렌더링 되고 나서 브라우저에 변화를 반영시키기 바로 직전에 DOM에 접근할 수 있다. 그리고 여기서 어떤 값을 return 하게 되면 componentDidUpdate에서 조회할 수 있다.
- componentDidUpdate
    prevProps와 this.props를 비교할 수 있다.

### 언마운트
- componentWillUnmount
    컴포넌트가 사라지기 바로 직전에 호출되는 메서드
    주로 등록된 이벤트를 제거하거나 setTimeout을 취소하는 것
    