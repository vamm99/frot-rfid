<template>
    <header>
        <nav class="navbar bg-body-tertiary fixed-top">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Sistema RFID</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Sistema RFID</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li class="nav-item over mb-3">
                                <RouterLink class="nav-link margen" to="/recargar">Recargar tarjeta</RouterLink>
                            </li>
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    Opciones del usuario
                                </button>
                                <ul class="dropdown-menu ">
                                    <li class="over">
                                        <RouterLink class="nav-link margen" to="/registrar">Registrar usuario
                                        </RouterLink>
                                    </li>
                                    <li class="over">
                                        <RouterLink class="nav-link margen" to="/actualizar">Actualizar usuario
                                        </RouterLink>
                                    </li>
                                    <li class="over">
                                        <RouterLink class="nav-link margen" to="/listar">Usuarios registrados
                                        </RouterLink>
                                    </li>
                                </ul>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style>
.navbar-brand,
.offcanvas-title {
    font-weight: bold;
}

.margen {
    margin-left: 10px;
}

.dropdown-toggle:hover {
    font-weight: bold;
    background-color: rgb(132, 138, 138);
    transition: 0.3s;

}

.over:hover {
    background-color: rgb(132, 138, 138);
    font-weight: bold;
    transition: 0.3s;
}
</style>