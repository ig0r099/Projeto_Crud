<template>
  <div id="app">
    <nav class="d-flex justify-content-start bg-primary bg-gradient">

      <router-link to="/funcionario" class="underline">
        <i class="UserIcon"></i>Funcionário |
      </router-link> 
      <router-link to="/">
        <i class="fas fa-user"></i>CadastroDependente
      </router-link> 
    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}

nav {
  padding: 32px;
  display: flex;
  justify-content: flex-end;
}

nav a {
  font-weight: bold;
  color: #000000;
  margin-left: 5px;
  text-decoration: none;
}

nav a i {
  margin-right: 2px;
}

nav a.router-link-exact-active {
  color: #000000;
}
</style>
