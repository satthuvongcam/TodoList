let data = localStorage.getItem('note')

if(!data) {
    localStorage.setItem('note', '[]')
    data = []
} else {
    data = JSON.parse(data);
}

let newData = []
newData = data
let index = 0
function render () {
    $('.textElement').css({display: 'none'})
    $('.list__item').html('')
    for(let i = 0; i < newData.length; i++) {
        $('.list__item').append(`
            <tr class='node${i}' data-bs-toggle="modal" data-bs-target="#exampleModal">
                <td>${newData[i].note}</td>
                <td>${newData[i].wrapTime}</td>
                <td>${newData[i].priority}</td>
                <td>${newData[i].done}</td>
            </tr>
        `)
        $(`.node${i}`).on('click', function () {
            index = i
            $('.update').css({display:'inline-block'});
            $('.delete').css({display:'inline-block'});
            $('.add').css({display:'none'});
        }) 
        if(newData[i].done == 'true') {
            $(`.node${i}`).css({background: 'green', color: 'white'})
        } else {
            $(`.node${i}`).css({background: 'red', color: 'white'})
        }
    }
}

function wrap (a, b) {
    let tg = a
    a = b
    b = tg
    return [a,b]
} 

function add () {
    let note = $('#note').val()
    let deadline = $('#deadline').val()
    let priority = $('#priority').val()
    let done = $('#done').val()
    let timeDeadline = new Date(deadline).toLocaleDateString().split('/')
    if (timeDeadline[0] < 10) {
        timeDeadline[0] = '0' + timeDeadline[0]
        console.log(timeDeadline[0]);
    }
    if (timeDeadline[1] < 10) {
        timeDeadline[1] = '0' + timeDeadline[1]
    }
    let wrapTime =  wrap(timeDeadline[0], timeDeadline[1])
    .join('/').concat('/').concat(timeDeadline[2])
    if(!note || !deadline || !priority) {
        return alert('Vui lòng điền đầy đủ thông tin')
    } else {
        $('.todolist__list-heading').html(`
            <th>Note</th>
            <th>Deadline</th>
            <th>Priority</th>
            <th>Done</th>
        `)
        data.push({note, wrapTime, priority, done})
        localStorage.setItem('note', JSON.stringify(data))
        $('.closeModal').click()
        render()
    }
}

function update() {
    let note = $('#note').val()
    let deadline = $('#deadline').val()
    let priority = $('#priority').val()
    let done = $('#done').val()
    let timeDeadline = new Date(deadline).toLocaleDateString()
    if (timeDeadline[0] < 10) {
        timeDeadline[0] = '0' + timeDeadline[0]
        console.log(timeDeadline[0]);
    } else if (timeDeadline[1] < 10) {
        timeDeadline[1] = '0' + timeDeadline[1]
    }
    let wrapTime =  wrap(timeDeadline[0], timeDeadline[1])
    .join('/').concat('/').concat(timeDeadline[2])
    if(!note || !deadline || !priority) {
        return alert('Vui lòng điền đầy đủ thông tin')
    } else {
        $('.todolist__list-heading').html(`
            <th>Note</th>
            <th>Deadline</th>
            <th>Priority</th>
            <th>Done</th>
        `)
        data[index] = {note, wrapTime, priority, done}
        localStorage.setItem('note', JSON.stringify(data))
        $('.closeModal').click()
        render()
    }
}

function Delete (){
    data.splice(index, 1);
    window.localStorage.setItem('note', JSON.stringify(data));
    $('.closeModal').click()
    render();
}

function sortDeadline() {
    let value = $('#sortElement').val()
    if(value == 0) {
        newData = data
        data.sort(function(a,b){
            if(a.wrapTime.split('/').reverse().join('/') < b.wrapTime.split('/').reverse().join('/')) {
                return -1
            }
        })
        render()
    } else if(value == 1) {
        newData = data
        data.sort(function(a,b){
            if(a.priority < b.priority) {
                return -1
            }
        })
        render()
    } else if(value == 2) {
        newData = data
        data.sort(function(a,b){
            if(a.note < b.note) {
                return -1
            }
        })
        render()
    } else if(value == 3) {
        newData = data
        newData = data.filter(function(value1){
            return value1.done === 'false'
        })
        render()
    }
    else if(value == 4) {
        newData = data
        newData = data.filter(function(value1){
            return value1.done === 'true'
        })
        render()
    }
}

// function sortPriority () {
//     data.sort(function(a,b){
//         if(a.priority < b.priority) {
//             return -1
//         }
//     })
//     render()
// }

$('.sort').on('click', sortDeadline)
