(function(){
    'use strict';
    var xhr = new XMLHttpRequest();
    var data = {};
    var container = document.querySelector('.container');
    const showModal = function(employee){
        document.querySelector('.imgEmployee').src = employee.imageUrl;
        document.querySelector('.overlay').style.display = 'block';
        document.querySelector('.name').textContent = employee.fullName;
        document.querySelector('.email').textContent = employee.email;
        document.querySelector('.city').textContent = employee.city;
        document.querySelector('.telephone').textContent = employee.telephone;
        document.querySelector('.address').textContent = employee.address;
        document.querySelector('.birthday').textContent = employee.birthday;
    }
    xhr.onreadystatechange = function(){
        if(xhr.status === 200 && xhr.readyState === 4){
            data = JSON.parse(xhr.responseText).results;
            console.log(data);
            for(let i = 0; i < data.length; i++){
                var employeeHTML = document.createElement('div');
                employeeHTML.className = 'employee';
                var img = document.createElement('img');
                img.src = data[i].picture.large;
                var heading = document.createElement('h4');
                heading.textContent = data[i].name.first + ' ' + data[i].name.last;
                var ul = document.createElement('ul');
                var li1 = document.createElement('li');
                li1.textContent = data[i].email;
                var li2 = document.createElement('li');
                li2.textContent = data[i].location.city;
                ul.appendChild(li1);
                ul.appendChild(li2);
                employeeHTML.appendChild(img);
                employeeHTML.appendChild(heading);
                employeeHTML.appendChild(ul);
                container.appendChild(employeeHTML);
                employeeHTML.addEventListener('click', function(e){
                    showModal({
                        imageUrl: data[i].picture.large,
                        fullName: data[i].name.first + ' ' + data[i].name.last,
                        email: data[i].email,
                        city: data[i].location.city,
                        telephone: data[i].phone,
                        address: data[i].location.street + ' ' + data[i].location.city + ', ' + data[i].location.state + ' ' + data[i].location.postcode,
                        birthday: 'Birthday: ' + data[i].dob.substring(8, 10) + '/' + data[i].dob.substring(5, 7) + '/' + data[i].dob.substring(0, 4)
                    });
                }, false);
            }
        }
    };
    for(var i = 0; i < 12; i++){
        xhr.open('GET', 'https://randomuser.me/api/?results=12', true);
        xhr.send();
    }
    document.querySelector('.close').addEventListener('click', function(e){
        e.target.parentNode.parentNode.style.display = 'none';
    }, false);
}());