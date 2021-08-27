import React from 'react';
import styled from 'styled-components';

const TodoHeadBlock = styled.div`
    padding : 48px 32px 32px 24px;
    border-bottom : 1px solid #e0ecef;
    h1{
        margin:0;
        font-size:36px;
        color:#343a40;
    }
    .day{
        margin-top:4px;
        ciolor:#868e96;
        font-size:21px;
    }
    .tasks-left{
        color: #20c997;
        font-size: 18px;l
        margin-top: 40px;
        font-wieight:bold;
    }
    `;

function TodoHead(){
    return(
        <TodoHeadBlock>
            <h1>2020 08 24</h1>
            <div className="day">일요일</div>
            <div className="tasks-left">할일 남음</div>
        </TodoHeadBlock>
    )
}

export default TodoHead;