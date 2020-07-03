<div class="nav-top">
				<div class="container d-flex flex-row">
					<button class="navbar-toggler sidenav-toggler2 ml-auto" type="button" data-toggle="collapse" data-target="collapse" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon">
							<i class="icon-menu"></i>
						</span>
					</button>
					<button class="topbar-toggler more"><i class="icon-options-vertical"></i></button>
					<!-- Logo Header -->
					<a href="index.html" class="logo logo-fixed d-flex align-items-center">
						<img src="{{ asset('img/renaksi1717/logo.png') }}" alt="navbar brand" class="navbar-brand" width="35%">
						<img src="{{ asset('img/renaksi1717/logo.png') }}" alt="navbar brand" class="navbar-brand navbar-brand-logo-fixed" width="35%">
					</a>
					<!-- End Logo Header -->

					<!-- Navbar Header -->
					<nav class="navbar navbar-header navbar-expand-lg p-0">
						<div class="container-fluid p-0">
							<ul class="navbar-nav topbar-nav ml-md-auto align-items-center">
								@guest
								<li class="nav-item">
									<a href="{{ route('login') }}" class="nav-link">
									<i class="fas fa-sign-in-alt"></i> LOGIN
										
									</a>
								</li>

								@endguest
								@auth
								<li class="nav-item dropdown hidden-caret">
									<a class="dropdown-toggle profile-pic" data-toggle="dropdown" href="#" aria-expanded="false">
										<div class="avatar-sm">
											<img src="{{ asset('img/' . Auth::user()->avatar) }}" alt="..." class="avatar-img rounded-circle">
										</div>
									</a>
									<ul class="dropdown-menu dropdown-user animated fadeIn">
										<div class="dropdown-user-scroll scrollbar-outer">
											<li>
												<div class="user-box">
													<div class="avatar-lg"><img src="{{ asset('img/' . Auth::user()->avatar) }}" alt="image profile" class="avatar-img rounded"></div>
													<div class="u-text">
														<h4>Hizrian</h4>
														<p class="text-muted">hello@example.com</p><a href="profile.html" class="btn btn-xs btn-secondary btn-sm">View Profile</a>
													</div>
												</div>
											</li>
											<li>
												<div class="dropdown-divider"></div>
												<a class="dropdown-item" href="#">Account Setting</a>
												<div class="dropdown-divider"></div>
												<a class="dropdown-item" href="{{ route('logout') }}">Logout</a>
											</li>
										</div>
									</ul>
								</li>
								@endauth
							</ul>
						</div>
					</nav>
					<!-- End Navbar -->
				</div>
			</div>
		</div>