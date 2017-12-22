document.addEventListener('DOMContentLoaded', init);

function init() {
    document.getElementById('btnSend').addEventListener('click', getNumbers);
    document.getElementById('btnSend').addEventListener('click', nav);
    document.getElementById('btnBack').addEventListener('click', nav);
}



function getNumbers(ev) {
    let flag = false;
//    let generateMessage = document.querySelector('#message');
//    generateMessage.innerHTML = '';
//    let url = 'http://localhost/mad9014-lotto/nums.php';
    let fd = new FormData();
    let digits = document.getElementById('digits').value;
    let max = document.getElementById('max').value;
    //    console.log(parseInt(digits));
    //    if(parseInt(digits)){};
    //    if(typeof digits == 'string'&&digits.length>0){}
    if (parseInt(digits) && parseInt(max)) {
        fd.append('digits', digits);
        fd.append('max', max);
        let info = {
            method: 'POST',
            body: fd
        }
        fetch(url, info)
            .then(response =>
                response.json()
            )
            .then(data => {
                if (data.code == 0) {
                    //code 0 means there are no errs in the server
                    //check if there are repeat numbers, if so fetch again
                    let copy = [];
                    for (let item of data.numbers) {
                        if (!copy.includes(item)) {
                            copy.push(item);
                        } else {
                            getNumbers(ev);
                            flag = true;
                            break;
                        }
                    };
                    if (flag) {
                        return;
                    };

                    let ul = document.querySelector('ul.num_list');
                    ul.innerHTML = '';
                    data.numbers.forEach(num => {
                        let li = document.createElement('li');
                        li.className = 'num';
                        li.textContent = num;
                        ul.appendChild(li);
                    })
                }
                let message = document.createTextNode(data.message);
                generateMessage.appendChild(message);

            }).catch(
        function (err) {
            //console.log("ERROR: ", err.message);
            let num_list = document.querySelector(".num_list");

            let messgae = document.createTextNode(err.message);
            num_list.appendChild(messgae);

        });
    } else {
        generateMessage.innerHTML = 'Missing required parameters!';
    }
}

function nav(ev) {
    ev.preventDefault(); //don't let the button navigate away
    let btn = ev.currentTarget;
    //console.log(btn);
    if (btn.id == 'btnBack') {
        //hide numbers show the form
        document.getElementById('home').classList.add('active');
        document.getElementById('list').classList.remove('active');
        document.querySelector('ul.num_list').innerHTML = '';
    } else if (btn.id == 'btnSend') {
        //hide form show the numbers
        document.getElementById('home').classList.remove('active');
        document.getElementById('list').classList.add('active');
        //getNumbers();
    } else {
        //none else
    }

}