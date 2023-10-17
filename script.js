// async function getPosts(){
// const data = await fetch("http://localhost/wordpress/wp-json/wp/v2/posts")
// const json = await data.json()
// console.log(json)
// for(let i in json){
//     const li = document.createElement("li")
//     li.innerHTML = json[i].title.rendered

//     document.querySelector("#lista").appendChild(li)

//     for(let i in json){
//         const div = document.createElement("div")
//         // div.setAttribute("class","div")
//          div.classList.add("div")

//         const p = document.createElement("p")
//         p.innerHTML = json[i].title.rendered

//         const publish = document.createElement("button")
//         publish.innerHTML = "publish"

//         const pending = document.createElement("button")
//         pending.innerHTML="pending"
//         pending.addEventListener("click",()=>{
//             changestatus(json[id],pending)
//         })

//         div.appendChild(p)
//         div.appendChild(publish)
//         div.appendChild(pending)
//         document.querySelector("body").appendChild(div)
//     }
// }

// async function changestatus(id,status){
//     const url = new URL(`http://localhost/wordpress/wp-json/wp/v2/posts${id}`)
//     const params = {
//         status:status

//     }
//     for(let i in params){
//         url.searchParams.append(i,params[i])
//     }
//     const data = await fetch(url,)
//     method="POST"
//     headers:{
//         authorization:`basic${btoa("Radzik:1qaz2wsx")}`
//     }
// }

// }

// getPosts()

async function getComments() {
    const body = document.getElementById("body")
    //branie komentarzow z wordpressa
    const data = await fetch("http://localhost/wordpress/wp-json/wp/v2/comments")
    const json = await data.json()
    console.log(json)


    //tworzenie divov z komentarzami

    for (let i in json) {
        const komentarz = document.createElement("div")
        komentarz.setAttribute("id", `komentarz${i}`)
        komentarz.setAttribute("class", "komentarze")
        komentarz.style.display = "inline-block"
        komentarz.innerHTML = json[i].content.rendered
        body.appendChild(komentarz)

        if (json[i].content.rendered == "<p>kupa</p>\n") {
            komentarz.style.backgroundColor = "red"
            const button = document.createElement("button")
            button.setAttribute("id", "skasuj")
            button.addEventListener("click", () => {
                deleteComment(i)
            })
            button.innerHTML = "delete"
            body.appendChild(button)
        }
    }



}

async function deleteComment(i) {

    const commentId = i;
    const apiUrl = `http://localhost/wordpress/wp-json/wp/v2/comments`;

    fetch(`${apiUrl}/${commentId}`, {
        method: 'DELETE',
        
        headers: {
            Authorization: `Basic${btoa("Radzik:1qaz2wsx")}`
        }
    })
        .then(response => {
            if (response.status === 200) {
                console.log('Comment deleted successfully.');
            } else {
                console.error('Error deleting comment.');
            }
        })
        .catch(error => console.error('Error:', error));

}

getComments()