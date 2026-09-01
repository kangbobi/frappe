frappe.logout = function (fallback) {
	frappe.call({
		method: "logout",
		callback: function (r) {
			if (r.exc) {
				return;
			}
			if (r.message) {
				window.location.href = r.message;
				return;
			}
			if (fallback) {
				fallback();
				return;
			}
			window.location.href = "/login";
		},
	});
};

if (frappe.Application) {
	frappe.Application.prototype.logout = function () {
		this.logged_out = true;
		frappe.confirm(__("Are you sure you want to log out?"), () => {
			frappe.logout(() => this.redirect_to_login());
		});
	};
}
