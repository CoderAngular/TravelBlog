(function(){})();
let listOfPosts = [
  {
    id:1,
    title: "Ladakh",
    budget: "50000",
    description: `Ladakh is the situated in the northern India. 
    No special permit is required to visit most of Ladakh, including Leh and Kargil towns.
    Permits are required for all tourists to visit the 'Inner Line' areas, i.e. Nubra Valley;
    Panggong Lake and the Durbuk Block that it lies in (i.e. north of the Changla Pass); 
    Tso-Moriri and Tsokar Lakes and the area along the Indus River east of Upshi; and Dha-hanu and
     the area along the Indus River northwest of Khalatse.`,
    date_posted: "12/12/2022",
    img_src: "https://assets.traveltriangle.com/blog/wp-content/uploads/2020/01/Pangong-Lake_22nd-Jan.jpg",
    writer: "Ola"
  },
  {
    id:2,
    title: "Kerala",
    budget: "40000",
    description: `Kerala is one of the most frequented tourist destination in 
    India for it has pleasant climate, clean beaches, exotic backwaters, 
    hill stations, network of rivers, waterfalls, wildlife sanctuaries, 
    spice plantations, paddy fields, art, culture, music, dance, festivals, 
    historical monuments, Ayurveda medication, cuisine and houseboat cruise. 
    Malayalam is the official language of Kerala and is widely spoken by the inhabitants. 
    This multi-ethnic and multi-religious state has the highest literacy rate in India. 
    Boat races in Kerala are very popular. The inhabitants of Kerala are proud of their 
    culture and put their effort to keep alive their cultural practices, classical dance 
    and music forms, folklores and traditional life style. 
    The people of Kerala live in perfect harmony.`,
    date_posted: "10/12/2022",
    img_src: "https://i0.wp.com/buddybits.com/wp-content/uploads/2016/06/10-Reasons-Why-Kerala-is-truly-Gods-Own-Country.jpg?w=696&ssl=1",
    writer: "Chola"
  }
];

function getAllPosts(){
  //write api to fetch the list of posts from the backend
  return localStorage.getItem("allPosts") ? JSON.parse(localStorage.getItem("allPosts")) : listOfPosts;
}

function loadPosts(){
  let allPosts = getAllPosts();
  localStorage.setItem("allPosts", JSON.stringify(allPosts));//store the latest posts in local storage
  renderPostsinUI(allPosts);
}

function renderPostsinUI(posts){
  posts.forEach(element => {
    let card = `<div class="col-sm-4">
                        <div class="card">
                          <img class="card-img-top" width="300" height="200" src="${element.img_src}">
                          <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Budget: Rs. ${element.budget}</h6>
                            <h6 class="card-subtitle mb-2 text-muted">Writer: ${element.writer}</h6>
                            <p class="card-text desc">${element.description}</a>
                          </div>
                          <a href="./detail.html?id=${element.id}" class="btn btn-link more-link">Read more...</a>
                        </div>
                      </div>`;
    document.getElementById("destinations").insertAdjacentHTML("afterbegin", card);
  });
}

function loadDetails(){
  let allBlogs = getAllPosts();
  const urlParams = new URLSearchParams(window.location.search);
  let blogId =  urlParams.get('id');
  let blog; 
  allBlogs.forEach(item => {if(item.id == blogId) blog = item;});
  loadDetailsCard(blog); 
}

function loadDetailsCard(blog){
  let card = `<div class="col-md">
                <div class="card">
                <img class="card-img-top" width="600" height="400" src="${blog.img_src}">
                <div class="card-body">
                  <h5 class="card-title">${blog.title}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Writer: ${blog.writer}</h6>
                  <p class="card-text">${blog.description}</p>
                </div>
                </div>
              </div>`;
    document.getElementById("blog-id").insertAdjacentHTML("afterbegin", card);
}

function submitForm(){

  let allPosts = getAllPosts();

  var title = document.getElementById("blogTitle");
  var desc = document.getElementById("blogDescription");
  var img_src = document.getElementById("blogImage");

  if(title.checkValidity() && desc.checkValidity() && img_src.checkValidity()){
    let titleVal = title.value;
    let descVal = desc.value;
    let img_srcVal = img_src.value;

    let budget = document.getElementById("blogBudget").value || 0;
    let writer = document.getElementById("blogWriter").value || "Anonymous";
    let length = allPosts.length;

    let newBlog = {
      id: length+1,
      title: titleVal,
      budget: budget,
      description: descVal,
      date_posted: new Date(),
      img_src: img_srcVal,
      writer: writer
    }
    allPosts.push(newBlog);
    localStorage.setItem("allPosts", JSON.stringify(allPosts));

    alert("Thank you for posting your travel experience in our posrtal!");
    document.getElementById("blogForm").requestFullscreen();
  }
}
