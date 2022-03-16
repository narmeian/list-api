function deleteItem() {
    let link = this.parentElement;
    let text1 = link.parentElement;
    let text = text1.firstElementChild.innerText;
    

    console.log(text);
        $.ajax({
        url: 'http://localhost:8080/delete_list/'+text,
        type: 'PUT',
        data: 'text',
        success: console.log('deleted item')
        });
}