<div class="pt-lg-2">
			<div class="container text-white pt-lg-2">
				<!-- Menu -->
				<nav class="navbar navbar-tab navbar-header-left navbar-expand-lg p-0">
					<ul class="navbar-nav page-navigation">
						<h3 class="title-menu bg-primary d-flex d-lg-none"> 
							Menu 
							<div class="close-menu"> <i class="flaticon-cross"></i></div>
						</h3>
						
						<li class="nav-item active dropdown">
							<a class="nav-link dropdown-toggle" href="/" id="beranda" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Beranda
							</a>
						</li>
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Profile
							</a>
							<div class="dropdown-menu animated fadeIn" aria-labelledby="navbarDropdown">
								<a class="dropdown-item" href="boards.html">Struktur Organisasi</a>
								<a class="dropdown-item" href="projects.html">Sambuatan Direktur</a>
								<a class="dropdown-item" href="email-inbox.html">Tupoksi</a>
							</div>
						</li>
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Informasi
							</a>
						</li>
						@auth
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Tindaklanjut
							</a>
						</li>
						@endauth
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Kontak
							</a>
						</li>
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Kritik dan Saran
							</a>
						</li>

					</ul>
				</nav>
				<!-- End Menu -->
				</div>
		</div>