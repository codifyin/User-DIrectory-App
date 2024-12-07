webix.ready(function() {
    // Основной интерфейс
    const ui = {
        rows: [
            // Форма регистрации
            {
                view: "form",
                id: "registerForm",
                hidden: true,
                elements: [
                    { view: "text", label: "Full Name", name: "fullname" },
                    { view: "text", label: "Username", name: "username" },
                    { view: "password", label: "Password", name: "password" },
                    { view: "select", label: "Role", name: "role", options: ["user", "admin"] },
                    { 
                        view: "button", 
                        value: "Register",
                        click: function() {
                            const form = $$("registerForm");
                            if (form.validate()) {
                                webix.ajax().post("register.php", form.getValues())
                                    .then(function(response) {
                                        webix.message("Registration successful!");
                                        form.hide();
                                    });
                            }
                        }
                    }
                ]
            },
            // Таблица пользователей (для админа)
            {
                view: "datatable",
                id: "userTable",
                hidden: true,
                columns: [
                    { id: "fullname", header: "Full Name", width: 200 },
                    { id: "username", header: "Username", width: 150 },
                    { id: "role", header: "Role", width: 100 },
                    { id: "is_blocked", header: "Blocked", width: 100 },
                    {
                        id: "actions",
                        header: "Actions",
                        template: function(obj) {
                            if (obj.role === "user") {
                                return `
                                    <button onclick="editUser('${obj.id}')">Edit</button>
                                    <button onclick="toggleBlock('${obj.id}')">
                                        ${obj.is_blocked ? 'Unblock' : 'Block'}
                                    </button>
                                `;
                            }
                            return "";
                        }
                    }
                ]
            }
        ]
    };

    webix.ui(ui);
});

function showRegisterForm() {
    $$("registerForm").show();
}

function showLoginForm() {
    // Аналогично форме регистрации
}