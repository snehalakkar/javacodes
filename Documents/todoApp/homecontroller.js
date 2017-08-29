app.controller('homeCtrl', function($scope, $state, $uibModal, userformService,
		generateAccessService) {
	$scope.myVarheader = false;
	$scope.myVarfooter = false;
	$scope.showimages = false;

	/* to set the margin top of card1 */
	/*
	 * if ($scope.myVarheader == false && $scope.myVarfooter == false) {
	 * $scope.getnotesMargin = { "margin-top" : "160px" }; }
	 */

	$scope.noteInput = function() {

		$scope.myVarheader = true;
		$scope.myVarfooter = true;

		/*
		 * $scope.getnotesMargin = { "margin-top" : "250px" }
		 */
	}

	/* to set type of view as grid */
	$scope.gridview1 = function() {
		/*$scope.listview = false;
		$scope.gridview = true;*/
		$scope.showgrid = true;
		$scope.showlist = false;

		localStorage.setItem("view", "grid");

	}

	/* to set type of view as list */
	$scope.listview1 = function() {
		/*$scope.listview = true;
		$scope.gridview = false;*/
		$scope.showlist = true;
		$scope.showgrid = false;

		localStorage.setItem("view", "list");
	}

	/* to check for view in localstorage for each refresh */
	if (localStorage.view == "list") {
		$scope.listview1();
	} else {
		$scope.gridview1();
	}

	/* to save notes in db */
	$scope.savenote = function() {

		$scope.myVarheader = false;
		$scope.myVarfooter = false;

		var method = "POST";
		var url = "app/saveTodo";

		var obj = {};
		obj.title = $scope.title;
		obj.description = $scope.description;

		var serviceobj = userformService.runservice(method, url, obj);

		serviceobj.then(function(response) {

			alert("************" + response);

			if (response.data.status == 120) {
				alert('check');
				var serviceobj1 = generateAccessService.runservice();
				alert(serviceobj1);
				serviceobj1.then(function(response) {
					alert("**" + response);
					if (response.status == 200) {
						alert('successfully access updated...');
						alert(response);

						alert(JSON.stringify(response.data.accessToken));
						alert(JSON.stringify(response.data.refreshToken));
						var accessToken = JSON
								.stringify(response.data.accessToken);
						var refreshToken = JSON
								.stringify(response.data.refreshToken);

						localStorage.setItem("accessToken", accessToken);
						localStorage.setItem("refreshToken", refreshToken);

						var method = "POST";
						var url = "app/saveTodo";

						var obj = {};
						obj.title = $scope.title;
						obj.description = $scope.description;

						var serviceobj = userformService.runservice(method,
								url, obj);
					} else if (response.status == 404) {
						alert('logout');
						$state.go("userLogin");
					}
				})
				alert('not success');
			}

			if (response.data.status == 1) {
				alert('success');
				alert(JSON.stringify(response));

				$state.reload();

				$scope.title = "";
				$scope.description = "";

				/* to set the margin top of card1 */
				$scope.getnotesMargin = {
					"margin-top" : "160px"
				};

			}

		})
	}

	// get all todotask from db.
	$scope.getNotes = function() {
		var method = "POST";
		var url = "app/getAllTodoTask";

		var obj = {};

		var serviceobj = userformService.runservice(method, url, obj);

		serviceobj.then(function(response) {

			if (response.status == 200) {
				$scope.records = response.data.reverse();
				console.log("hello g");
				/* setting name and email to use that in profile */
				$scope.username = response.data[0].user.fullName;
				$scope.useremail = response.data[0].user.email;

			} else {
				$state.go('userLogin');
			}
		})
	}

	/* calling getNotes() */
	$scope.getNotes();

	/* open dropdown on img list to delete and make a copy */
	$scope.opendropdown = function(id) {
		var method = "POST";
		var url = "app/deleteTodo/" + id;
		var obj = {};

		var serviceobj = userformService.runservice(method, url, obj);
		serviceobj.then(function(response) {

			if (response.status == 200) {

				/* loading page */
				$state.reload();
			}
		});

	}

	/* open popup to update todo */
	$scope.openModal = function(x) {

		$scope.modalInstance = $uibModal.open({
			ariaLabelledBy : 'modal-title',
			ariaDescribedBy : 'modal-body',
			templateUrl : 'templates/updatepopup.html',
			size : 'md',
			controller : function($scope, $uibModalInstance) {
				var id = x.todoId;
				this.title = x.title;
				this.description = x.description;
				this.user = x.user;

				/* update todo in DB */
				this.update = function() {
					var $ctrl = this;
					var method = "POST";
					var url = "app/updateTodo/" + id;
					var obj = {};
					obj.title = $ctrl.title;
					obj.description = $ctrl.description;
					obj.user = this.user;

					var serviceobj = userformService.runservice(method, url,
							obj);
					serviceobj.then(function(response) {

						if (response.status == 200) {

							$state.reload();
						}
					});
					$uibModalInstance.close();
				}
			},
			controllerAs : '$ctrl',
		});
	}

	/* logout user and send back to login page */
	$scope.logout = function() {
		var method = "POST";
		var url = "app/logout";
		var obj = {};

		var serviceobj = userformService.runservice(method, url, obj);

		serviceobj.then(function(response) {

			if (response.status == 200) {

				localStorage.removeItem("accessToken");
				localStorage.removeItem("refreshToken");
				$state.go("userLogin");

			}
		});
	};
});

