<template>
  <div class="popupWin" >
    <button class="clsbtn" @click="close">x</button>
    <form class="resForm" @submit.prevent="confirm">
        <label for="todo">活動:
            <input type="text" id="todo" @change="todo">
        </label>
        <label for="date">日期:
            <input type="date" id="date" placeholder="select day of current month" @change="date" >
        </label>
        <label for="start">開始時間:
            <input type="time" id="start" @change="start">
        </label>
        <label for="end">結束時間:
            <input type="time" id="end" @change="end">
        </label>
        <button>確定</button>
    </form>
  </div>

</template>

<script>
export default {
    setup(props, { emit }) {
        const close = () => {
            emit('close')
        }
        const todo = (event) => {
            emit('todo', event)
        }
        const date = (event) => {
            emit('date', event)
        }
        const start = (event) => {
            emit('start', event)
        }
        const end = (event) => {
            emit('end', event)
        }
        const confirm = () => {
            emit('confirm')
        }

        return{ close, todo, date, start, end, confirm }
    }
}
</script>

<style>
    .popupWin {
        position: absolute;
        left: 25%;
        top: 40%;
        padding: 1rem;
        border-radius: 10px;
        border: 3px solid gray;
        background: white;
        text-align: left;
    }
    .clsbtn {
        font-size: 1.4rem;
        position: absolute;
        right: 2%;
        top: 2%;
        border: none;
        background: none;
    }
    .clsbtn:hover {
        color: gray;
    }
    .resForm {
        margin-top: 1rem;
    }
    .resForm label {
        display: block;
        margin: 10px 0;
    }
    .resForm button {
        margin-left: 40%;
        border-radius: 10px;
        padding: 5px;
    }
    .resForm button:hover {
        background: #7F74B4;
        color: white;
    }
</style>