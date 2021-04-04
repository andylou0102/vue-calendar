<template>
  <div class="popupWin" >
    <button class="clsbtn" @click="close">x</button>
    <form class="resForm" @submit.prevent="confirm">
        <label for="todo">activity:
            <input type="text" id="todo" @change="todo">
        </label>
        <label for="date">date:
            <input type="date" id="date" placeholder="select day of current month" @change="date" >
        </label>
        <label for="start">start:
            <input type="time" id="start" placeholder="" @change="start">
        </label>
        <label for="end">end:
            <input type="time" id="end" @change="end">
        </label>
        <button>Submit</button>
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
        width: 50%;
        position: absolute;
        left: 27%;
        top: 30%;
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
        display: inline-block;
        width: 100%;
        font-size: .9rem;
        margin: 10px 0;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #555;
        margin-bottom: 10px;
    }
    .resForm input {
        display: block;
        width: 80%;
        border: none;
        border-bottom: 1px solid #ddd;
        padding: 5px 15px;
        outline: none;
        margin-top: 5px;
    }
    .resForm button {
        margin-left: 30%;
        border-radius: 20px;
        padding: 10px;
        background: #7F74B4;
        color: white;
        letter-spacing: 1.5px;
    }
    .resForm button:hover {
        background: #7167a3;
        color: rgb(224, 224, 224);
    }
</style>