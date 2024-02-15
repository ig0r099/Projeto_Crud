<template>
  <div id="app">
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item to="/" href="#">Time</b-nav-item>
        <b-nav-item to="/jogador" href="s">Jogador</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
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
