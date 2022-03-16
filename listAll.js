function listAll(){
    const ul=document.getElementById('list_id');
    while (ul.hasChildNodes()) {
        ul.removeChild(ul.firstChild);
        }

    $.get('http://localhost:8080/list', function(data){

        let list_id=data;
        list_id.map(function(list_item){

            let div = document.createElement("div");
            div.className='container';

            let row = document.createElement("div");
            row.className='row';

            let timeTag = document.createElement("div");
            timeTag.className='col fs-5';

            let li=document.createElement("div");
            li.className='col fs-5';

            timeTag.innerText=list_item['created_at'].substring(0,10);

            let btnGroup=document.createElement("div");
            btnGroup.className='col';

            let btn=document.createElement("button");
            btn.className='btn btn-outline-danger';
            btn.innerText="Remove";
            btn.addEventListener('click',deleteItem);
            btn.addEventListener('click',function(){
                location.reload();
            })

            div.appendChild(row);
            row.appendChild(li);
            row.appendChild(timeTag);
            row.appendChild(btnGroup);
            btnGroup.appendChild(btn);
            ul.appendChild(div);

            li.innerText=list_item['input'];
        })
    })
}