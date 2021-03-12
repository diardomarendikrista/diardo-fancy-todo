const baseURL = 'https://diardo-fancy-todo.herokuapp.com/'

$("document").ready(() => {
  initialize();
  checkLocalStorage();

  $("#to-login").on("click", (event) => {
    event.preventDefault();
    $("#login-page").show();
    $("#register-page").hide();
  });

  $("#to-register").on("click", (event) => {
    event.preventDefault();
    $("#login-page").hide();
    $("#register-page").show();
  });

  $("#btn-login").on("click", (event) => {
    event.preventDefault();
    login();
  })

  $("#btn-logout").on("click", () => {
    logout();
  })

  $("#btn-register").on("click", (event) => {
    event.preventDefault();
    register();
  })

  $("#btn-add-todo").on("click", (event) => {
    event.preventDefault();
    addTodo();
  })

  $("#btn-edit-todo").on("click", (event) => {
    event.preventDefault();
    EditTodo();
  })

  $("#btn-cancel-edit-todo").on("click", (event) => {
    event.preventDefault();
    cancelEditTodo();
  })

})

function initialize() {
  $("#content").hide();
  $("#login-page").hide();
  $("#user-info").hide();
  $("#form-edit-todo").hide();
}

function checkLocalStorage() {
  if (localStorage.token) {
    $("#login-register-page").hide();
    $("#register-page").hide();
    $("#login-page").hide();
    $("#content").show();
    $("#user-info").show();
    $("#user-name").html(localStorage.name)
    quotes();
    fetchData()
  } else {
    $("#login-register-page").show();
    $("#login-page").hide();
    $("#user-info").hide();
    $("#content").hide();
    $("#register-page").show();
    $("#user-name").html();
    $("#btn-logout").show();
  }
}

function onSignIn(googleUser) {
  $.ajax({
    method: "POST",
    url: baseURL + 'loginGoogle',
    data: {
      token: googleUser.getAuthResponse().id_token
    }
  })
    .done((response) => {
      localStorage.setItem("token", response.token);
      localStorage.setItem("name", response.name);
      checkLocalStorage();
    })
    .fail((err) => {
      console.log(err);
    })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function login() {
  const email = $("#email-login").val();
  const password = $("#password-login").val();

  $.ajax({
    method: 'POST',
    url: baseURL + 'login',
    data: {
      email,
      password
    },
  })
    .done((response) => {
      localStorage.setItem("token", response.token);
      localStorage.setItem("name", response.name);
      checkLocalStorage();
    })
    .fail((err) => {
      console.log(err);
      $(".login-warning").html(err.responseJSON.message)
      $(".login-warning").show(300, function () {
        setTimeout(() => {
          $(".login-warning").hide(300)
        }, 1500);
      })
    })
    .always(() => {
      $("#email-login").val("");
      $("#password-login").val("");
    })
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  localStorage.removeItem("id");
  localStorage.removeItem("email");
  //logout from all social
  //google
  signOut()
  //to refresh
  checkLocalStorage();
  //to show login page i/o register page
  $("#register-page").hide();
  $("#login-page").show();
}

function register() {
  const email = $("#email-register").val();
  const password = $("#password-register").val();
  const repeatPassword = $("#repeat-password-register").val();

  if (password == repeatPassword) {
    $.ajax({
      method: "post",
      url: baseURL + 'register',
      data: {
        email,
        password
      }
    })
      .done((response) => {
        $("#register-page").hide();
        $("#login-page").show();
      })
      .fail((err) => {
        console.log(err);
        $(".login-warning").html(err.responseJSON.message);
        $(".login-warning").show(300, function () {
          setTimeout(() => {
            $(".login-warning").hide(300)
          }, 1500);
        })
      })
      .always(() => {
        $("#email-register").val("");
        $("#password-register").val("");
        $("#repeat-password-register").val("");
      })
  } else {
    $(".login-warning").html("Password didn't match!");
    $(".login-warning").show(300, function () {
      setTimeout(() => {
        $(".login-warning").hide(300)
      }, 1500);
    })
  }
}

function fetchData() {
  $("#todos").empty();
  $.ajax({
    method: "GET",
    url: baseURL + 'todos',
    headers: {
      token: localStorage.token
    }
  })
    .done((response) => {
      response.forEach(todo => {
        let status, textColor, updateStatus;
        if (todo.status === true) {
          status = 'Done';
          textColor = 'text-primary';
          updateStatus = 'Set as Not Done'
        } else {
          status = 'Not Done';
          textColor = 'text-danger';
          updateStatus = 'Set as Done'
        }
        $("#todos").append(
          `
          <div class="card mb-3">
              <div class="row">
                <div class="col">
                  <div class="card-header text-white bg-info font-weight-bolder">Due date : ${todo.due_date}</div>
                </div>
              </div>
              <div class="row flex">
                <div class="col">
                  <div class="card-body">
                    <h5 class="card-title text-info">${todo.title}</h5>
                    <p class="card-text">${todo.description}</p>
                    <p class="card-text">Status : <span class="${textColor}">${status}</span></p>
                  </div>
                </div>
                <div class="col-sm-4 btn-groups">
                  <a class="btn btn-info btn-todo" onClick="changeStatus(${todo.id}, ${todo.status})">${updateStatus}</a>
                  <a href="#" class="btn btn-info btn-todo" onClick="editTodoForm(${todo.id})">Edit</a>
                  <a class="btn btn-danger btn-todo" onClick="deleteTodo(${todo.id})">Delete</a>
                </div>
              </div>
            </div>
          `
        )
      });
    })
    .fail((err) => {
      console.log(err);
    })
}

function changeStatus(id, status) {
  status === true ? status = false : status = true;

  $.ajax({
    method: 'PATCH',
    url: baseURL + 'todos/' + id,
    data: {
      status
    },
    headers: {
      token: localStorage.token
    }
  })
    .done(() => {
      fetchData();
      $("#your-todo-info").removeClass().addClass("text-primary");
      $("#your-todo-info").html(`Success change status!`);
      $("#your-todo-info").show(300, function () {
        setTimeout(() => {
          $("#your-todo-info").hide(300)
        }, 1500);
      })
    })
    .fail((err) => {
      console.log(err);
    })
}

function addTodo() {
  const title = $("#title").val();
  const due_date = $("#due_date").val();
  const description = $("#description").val();

  $.ajax({
    method: 'POST',
    url: baseURL + 'todos',
    data: {
      title,
      due_date,
      description
    },
    headers: {
      token: localStorage.token
    }
  })
    .done(() => {
      fetchData();
      $("#title").val("");
      $("#due_date").val("");
      $("#description").val("");

      $("#add-todo-info").removeClass().addClass("text-primary");
      $("#add-todo-info").html("Success add new todo!");
      $("#add-todo-info").show(300, function () {
        setTimeout(() => {
          $("#add-todo-info").hide(300)
        }, 1500);
      })
    })
    .fail((err) => {
      console.log(err);
      $("#add-todo-info").removeClass().addClass("text-danger");
      $("#add-todo-info").html(err.responseJSON.message);
      $("#add-todo-info").show(300, function () {
        setTimeout(() => {
          $("#add-todo-info").hide(300)
        }, 1500);
      })
    })
}

function deleteTodo(id) {
  $.ajax({
    method: 'DELETE',
    url: baseURL + 'todos/' + id,
    data: {
      id
    },
    headers: {
      token: localStorage.token
    }
  })
    .done(() => {
      fetchData();
      $("#your-todo-info").removeClass().addClass("text-primary");
      $("#your-todo-info").html(`Success delete todo!`);
      $("#your-todo-info").show(300, function () {
        setTimeout(() => {
          $("#your-todo-info").hide(300)
        }, 1500);
      })
    })
    .fail((err) => {
      console.log(err);
    })
}

function cancelEditTodo() {
  $("#title-edit").val("");
  $("#due_date-edit").val("");
  $("#description-edit").val("");
  $("#status-edit").val("");
  $("#form-add-todo").show();
  $("#form-edit-todo").hide();
}

function editTodoForm(id) {
  $("#form-add-todo").hide();
  $("#form-edit-todo").show();

  $.ajax({
    method: 'GET',
    url: baseURL + 'todos/' + id,
    headers: {
      token: localStorage.token
    }
  })
    .done((response) => {
      $("#title-edit").val(response.title);
      $("#due_date-edit").val(response.due_date);
      $("#description-edit").val(response.description);
      $("#status-edit").empty();
      if (response.status === true) {
        $("#status-edit").append(
          `
          <option value="true">Status : Done</option>
          <option value="false">Status : Not Done</option>
          `
        )
      } else {
        $("#status-edit").append(
          `
          <option value="false">Status : Not Done</option>
          <option value="true">Status : Done</option>
          `
        )
      }
      $("#edit-todo").removeClass().addClass(String(response.id))
    })
    .fail((err) => {
      console.log(err);
    })
}

function EditTodo() {
  const title = $("#title-edit").val();
  const due_date = $("#due_date-edit").val();
  const description = $("#description-edit").val();
  const status = $("#status-edit").val();
  const id = $("#edit-todo").attr("class");

  $.ajax({
    method: 'PUT',
    url: baseURL + 'todos/' + id,
    data: {
      title,
      due_date,
      status,
      description
    },
    headers: {
      token: localStorage.token
    }
  })
    .done(() => {
      fetchData();
      $("#form-add-todo").show();
      $("#form-edit-todo").hide();
      $("#title-edit").val("");
      $("#due_date-edit").val("");
      $("#description-edit").val("");
      $("#status-edit").val("");

      $("#your-todo-info").removeClass().addClass("text-primary");
      $("#your-todo-info").html("Success editing todo!");
      $("#your-todo-info").show(300, function () {
        setTimeout(() => {
          $("#your-todo-info").hide(300)
        }, 1500);
      })
    })
    .fail((err) => {
      console.log(err);

      $("#edit-todo-info").removeClass().addClass("text-danger");
      $("#edit-todo-info").html(err.responseJSON.message);
      $("#edit-todo-info").show(300, function () {
        setTimeout(() => {
          $("#edit-todo-info").hide(300)
        }, 1500);
      })

    })
}

function quotes() {
  $.ajax({
    method: 'get',
    url: baseURL + 'quotes',
    headers: {
      token: localStorage.token
    }
  })
    .done(response => {
      $("#quotes").empty()
      $("#quotes").append(
        `
        <div class="card text-white bg-info mb-3">
          <div class="card-header text-dark"><h5><b>Today Inspiration</b></h5></div>
          <div class="card-body">
              <p class="card-text">${response.data.quotes}</p>
              <p class="blockquote-footer text-warning">${response.data.author}</p>
          </div>
        </div>
        `
      )
    })
    .fail(err => {
      console.log(err)
    })
}